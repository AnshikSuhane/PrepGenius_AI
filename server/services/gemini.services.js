const Gemini_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function isRetryableStatus(status) {
  return [429, 500, 502, 503, 504].includes(status);
}

function parseRetryAfterMs(headers) {
  const ra = headers.get("retry-after");
  if (!ra) return null;

  // retry-after can be seconds or a HTTP date
  const asInt = Number(ra);
  if (Number.isFinite(asInt)) return Math.max(0, asInt * 1000);

  const asDate = Date.parse(ra);
  if (!Number.isNaN(asDate)) return Math.max(0, asDate - Date.now());

  return null;
}

function extractJson(text) {
  // remove ```json / ``` wrappers if present
  const cleaned = text.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned);
}

export const generateGeminiResponse = async (prompt, opts = {}) => {
  const {
    maxRetries = 5,
    baseDelayMs = 800,
    maxDelayMs = 10_000,
    timeoutMs = 60_000,
  } = opts;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      let response;
      let bodyText = "";

      try {
        response = await fetch(`${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        });

        bodyText = await response.text();

        if (response.ok) {
          const data = bodyText ? JSON.parse(bodyText) : {};
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (!text) {
            throw new Error("Gemini returned no text in candidates[0].content.parts[0].text");
          }

          return extractJson(text);
        }

        // non-2xx
        const status = response.status;

        if (isRetryableStatus(status) && attempt < maxRetries) {
          const retryAfter = parseRetryAfterMs(response.headers);
          const expo = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt);
          const jitter = Math.floor(Math.random() * 250);
          const waitMs = (retryAfter ?? expo) + jitter;

          console.warn(
            `Gemini HTTP ${status} (attempt ${attempt + 1}/${maxRetries + 1}). Retrying in ${waitMs}ms...`
          );
          await sleep(waitMs);
          continue;
        }

        // not retryable or out of retries
        const err = new Error(
          `Gemini request failed (HTTP ${status}). Body: ${bodyText.slice(0, 2000)}`
        );
        err.status = status;
        err.body = bodyText;
        throw err;
      } catch (err) {
        // fetch threw (network/abort/etc.)
        const isAbort = err?.name === "AbortError";
        const canRetry = !isAbort && attempt < maxRetries;

        if (canRetry) {
          const expo = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt);
          const jitter = Math.floor(Math.random() * 250);
          const waitMs = expo + jitter;

          console.warn(
            `Gemini fetch error (attempt ${attempt + 1}/${maxRetries + 1}): ${err?.message}. Retrying in ${waitMs}ms...`
          );
          await sleep(waitMs);
          continue;
        }

        throw err;
      }
    }

    throw new Error("Gemini request failed after retries");
  } finally {
    clearTimeout(timeout);
  }
};

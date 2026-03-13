# 🚀 PrepGenius AI

PrepGenius AI is an **AI-powered study assistant** that helps students generate **exam-focused notes, project documentation, diagrams, and downloadable PDFs instantly**. The platform uses AI to produce structured and revision-ready content, making studying faster and more efficient.

---

# 🌐 Live frontend Demo Link

🔗 https://prepgenius-ai-client.onrender.com
#  🌐 Live Backend Demo Link

🔗 https://prepgenius-ai-server.onrender.com

---

# 📌 Features

✨ **AI-Powered Notes Generation**  
Generate structured and exam-focused notes using AI.

📘 **Exam-Oriented Content**  
Summaries are designed for quick revision and better retention.

📂 **Project Documentation**  
Create clean and structured documentation for projects.

📊 **Auto Diagrams & Charts**  
Visual diagrams and charts are generated automatically.

💳 **Credit-Based System**  
Generate notes using a credit system.

💰 **Stripe Payment Integration**  
Securely purchase additional credits.

📥 **PDF Download**  
Download clean, printable notes in PDF format.

🔐 **Google Authentication**  
Secure login using Firebase Google Auth.

📱 **Responsive UI**  
Fully responsive design for desktop, tablet, and mobile devices.

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Redux Toolkit

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Integrations
- OpenAI API
- Stripe Payments
- Firebase Authentication

---

# 📂 Project Structure
PrepGenius/
│
├── client/ # React Frontend
│ ├── components/
│ ├── pages/
│ ├── redux/
│ └── assets/
|    ├── dashboard.png
|    ├── Auth.png
|    └── Notes.png
│
├── server/ # Backend API
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ └── middleware/
│ └── proxy.ts
│
└── README.md
---

# ⚙️ Installation & Setup
|
├──Frontend
|  ├──cd client
|  ├──npm install
|
├──Backend
|  ├──cd server
|  ├──npm install

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/AnshikSuhane/prepgenius.git
cd prepgenius
 ```
 ## Environment Variables

  # Create a .env file inside the server folder.
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLIENT_URL=http://localhost:5173
```

4️⃣ Run the Application
Start Backend
npm run dev
Start Frontend
npm run dev
💳 Stripe Payment Flow

1️⃣ User selects a credit plan
2️⃣ Backend creates Stripe checkout session
3️⃣ User completes payment
4️⃣ Stripe sends a webhook to the backend
5️⃣ Backend verifies payment and adds credits to the user account

## Deployment

 # PrepGenius can be deployed using modern cloud platforms for both the frontend and backend.

 # Frontend Deployment (Render)

 # The frontend of PrepGenius is deployed on Render.

# Live URL

🔗 https://prepgenius-ai-client.onrender.com

# Steps to Deploy

# Go to https://render.com

# Click New → Static Site

# Connect your GitHub repository

# Configure the build settings:

# Build Command: npm install && npm run build
  #Publish Directory: dist

# Click Deploy

# After deployment, your frontend will be available at:

# https://prepgenius-ai-client.onrender.com

## Backend Deployment (Render)
# Steps to Deploy

# Go to https://render.com

# Click New → Web Service

# Connect your GitHub repository

# Configure the settings:

# Build Command: npm install
# Start Command: npm start

# Click Deploy

# Your backend API will then be available on a Render-generated URL such as:

## https://prepgenius-ai-server.onrender.com

import UserModel from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
  try {

    if (!req.userId) {
      return res.status(401).json({
        message: "User not authenticated."
      })
    }

    const user = await UserModel.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        message: "Current user not found."
      })
    }

    return res.status(200).json(user)

  } catch (error) {
    console.error("getCurrentUser error:", error)

    return res.status(500).json({
      message: `getCurrentUser error ${error.message}`
    })
  }
}

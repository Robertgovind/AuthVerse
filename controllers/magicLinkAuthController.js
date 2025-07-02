import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendMagicLink from "../utils/sendMagicLink.js";

// Request login link
const requestMagicLink = async (req, res) => {
  const { email } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  await sendMagicLink(email, token);
  res.status(200).json({ success: true, message: "Magic link sent to email" });
};

const verifyMagicLink = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: true, message: "Invalid token" });
    }
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      message: "User logged in",
      token: authToken,
      user,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Token expired or invalid" });
  }
};

export { requestMagicLink, verifyMagicLink };

import Otp from "../models/OTP.js";
import optGenerator from "../utils/otpGenerator.js";
import sendEmail from "../utils/sendOTP.js";

const sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email required" });
  }
  const otp = optGenerator();
  const expiresAt = Date.now() + 5 * 60 * 1000;
  await Otp.create({ otp, email, expiresAt });

  try {
    await sendEmail(email, otp);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP required" });

  const user = Otp.findOne({ email });
  if (!user)
    return res.status(400).json({ success: false, message: "NO OTP found" });
  console.log(otp);
  console.log(user.otp);
  if (Date.now() > user.expiresAt)
    return res.status(400).json({ success: false, message: "OTP expired" });

  if (user.otp != otp)
    return res.status(400).json({ success: false, message: "Invalid otp" });
  await Otp.findAndUpdate({ email }, { otp: "" });
  res.status(200).json({ success: true, message: "OTP verified successfully" });
};

export { sendOTP, verifyOTP };

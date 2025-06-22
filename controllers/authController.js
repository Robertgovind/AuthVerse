import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/token.js";
import validator from "validator";

// Register a new user
const register = async (req, res) => {
  try {
    const { email, password, name, address, phone } = req.body;
    const userExists = await User.findOne({ email });
    // Check if user already exists
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    //validation email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must have at least 6 characters",
      });
    }
    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      address,
      phone,
    });
    // Saving password to database
    const user = await newUser.save();
    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: req.body,
      token: token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Error occured while registering user",
      error: error.message,
    });
  }
};

// Login an existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesnot exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    const token = generateToken(user._id);
    res
      .status(200)
      .json({ success: true, message: "User logged in", token: token });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error occured while loggin in",
        error: error.message,
      });
  }
};

// logout a user
const logout = (req, res) => {};

export { register, login, logout };

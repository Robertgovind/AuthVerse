import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/token.js";

// Register a new user
const register = async (req, res) => {};

// Login an existing user
const login = (req, res) => {};

// logout a user
const logout = (req, res) => {};

export { register, login, logout };

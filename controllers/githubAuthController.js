import generateToken from "../utils/token.js";

const githubAuthCallback = (req, res) => {
  const token = generateToken(req.user._id);
  res.status(200).json({
    success: true,
    token: token,
    user: req.user,
  });
};

export default githubAuthCallback;

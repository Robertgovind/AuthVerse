import session from "express-session";

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
});

export default sessionMiddleware;

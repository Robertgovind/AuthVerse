import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../../models/User.js";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
          user = await User.create({
            facebookId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value || "",
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;

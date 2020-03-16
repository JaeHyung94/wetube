import passport from "passport";
import githubStrategy from "passport-github";
import googleStrategy from "passport-google-oauth";
import User from "./models/User";
import {
  githubLoginCallback,
  fbLoginCallback,
  googleLoginCallback
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());
passport.use(
  new githubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubcallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new googleStrategy.OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `http://localhost:4000${routes.googleCallback}`
    },
    googleLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

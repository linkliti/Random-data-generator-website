const passport = require("passport");
const MicrosoftStrategy = require('passport-microsoft').Strategy;

passport.use(new MicrosoftStrategy({
  // Standard OAuth2 options
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.SERVER_URL + "/auth/microsoft/callback",
  scope: ['user.read'],

  // Microsoft specific options

  // [Optional] The tenant for the application. Defaults to 'common'.
  // Used to construct the authorizationURL and tokenURL
  tenant: 'common',

  // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
  authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',

  // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
  tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
},
  function (accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
const router = require("express").Router();
const passport = require("passport");
const save = require("../save/save");

router.get("/login/success", (req, res) => {
  if (req.session.passport.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.session.passport.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/microsoft",
  passport.authenticate("microsoft", {
    // Optionally define any authentication parameters here
    // For example, the ones in https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow

    prompt: "select_account",
  })
);

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    save
      .initUser(req.session.passport.user.id)
      .then((response) => {
        res.redirect(process.env.CLIENT_URL + "");
      })
      .catch((err) => {
        res.status(500).send(error);
      });
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;

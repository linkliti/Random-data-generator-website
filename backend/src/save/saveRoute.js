const router = require("express").Router();
const save = require("./save");

router.get("/get", (req, res) => {
  if (req.user) {
    save
      .getData(req.user.id)
      .then((response) => {
        res.status(200).json({
          error: false,
          message: response,
        });
        console.log("Sent user data");
      })
      .catch((e) => {
        res.status(500).send(error);
      });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.post("/save", (req, res) => {
  if (req.user) {
    save
      .saveData(req.body, req.user.id)
      .then((response) => {
        res.status(200).json({
          error: false,
          message: response,
        });
        console.log("Saved user data");
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({
          error: true,
          message: "Save receive failed",
        });
      });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

module.exports = router;

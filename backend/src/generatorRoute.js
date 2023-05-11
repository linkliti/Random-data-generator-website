const router = require("express").Router();
const generator = require("./generator/generator")

router.get("/options", (req, res) => {

  var msg = generator.getOptions();

  res.status(200).json({
    error: false,
    message: msg,
  });
});

module.exports = router;
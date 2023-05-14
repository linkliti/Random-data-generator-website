const router = require("express").Router();
const generator = require("./generator/generator");

router.get("/options", (req, res) => {
  var msg = generator.getOptions();

  res.status(200).json({
    error: false,
    message: msg,
  });
});

router.post("/generate", (req, res) => {
  try {
  var msg = generator.generateData(req.body);
  res.status(200).json({
    error: false,
    message: msg,
  });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({
      error: true,
      message: "Generation Failed",
    });
  }
});

module.exports = router;

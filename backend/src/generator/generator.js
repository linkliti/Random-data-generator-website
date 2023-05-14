const blacklistedKeys = [
  "_mersenne",
  "_defaultRefDate",
  "_locale",
  "_localeFallback",
  "locales",
  "rawDefinitions",
  "definitions"
];
const blacklistedSubkeys = { helpers: ["fake", "unique", "multiple"] };

BigInt.prototype.toJSON = function () {
  return this.toString();
};

module.exports = {
  getOptions: function () {
    const { faker } = require("@faker-js/faker/locale/ru");
    const keys = Object.keys(faker);
    const filteredKeys = keys.filter((key) => !blacklistedKeys.includes(key));

    const parsedKeys = {};

    filteredKeys.forEach((key) => {
      var subObject = faker[key];
      var subKeys = Object.keys(subObject);
      parsedKeys[key] = [];
      subKeys.forEach((subkey) => {
        if (typeof faker[key][subkey] === "function") {
          if (blacklistedSubkeys[key]) {
            if (!blacklistedSubkeys[key].includes(subkey))
              parsedKeys[key].push(subkey);
          } else {
            parsedKeys[key].push(subkey);
          }
        }
      });
    });

    console.log("Sending options to client side");
    return parsedKeys;
  },
  generateData: function (req) {
    if (!req.category || !req.func || !req.lang || !req.count)
      return "Invalid parameters";
    var { faker } = require("@faker-js/faker/locale/" + req.lang);
    try {
      var data = [];
      var isSeeded = req.seed ? true : false;
      if (isSeeded) {
        faker.setDefaultRefDate(new Date("2020-01-01"));
        for (let i = 0; i < req.count; i++) {
          faker.seed(Number(req.seed) + i);
          var fakerFunc =
            "{{" + req.category + "." + req.func + "(" + req.params + ")}}";
          data.push(faker.helpers.fake(fakerFunc));
        }
      } else {
        for (let i = 0; i < req.count; i++) {
          var fakerFunc =
            "{{" + req.category + "." + req.func + "(" + req.params + ")}}";
          data.push(faker.helpers.fake(fakerFunc));
        }
      }
      console.log("Sending data to client side");
      return JSON.stringify(data);
    } catch (e) {
      console.log(e.message);
      return '["Ошибка: ' + e.message + '"]';
    }
  },
};

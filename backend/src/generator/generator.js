const blacklistedKeys = [
  "_mersenne",
  "_defaultRefDate",
  "_locale",
  "_localeFallback",
  "locales",
];
const blacklistedSubkeys = { company: "companyName", datatype: "array" };

BigInt.prototype.toJSON = function () {
  return this.toString();
};

module.exports = {
  getOptions: function () {
    const { faker } = require("@faker-js/faker");
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
    try {
    if (!req.category || !req.func || !req.lang || !req.count) return "Invalid parameters";
    var { faker } = require("@faker-js/faker/locale/" + req.lang);

    if (req.params) {
      var text = req.params;
      if ((text[0] == '"' && text[text.length - 1] == '"') || (text[0] == "'" && text[text.length - 1] == "'")) {
        console.log("String param");
        var params = "";
        params = req.params.slice(1, -1);
      } else {
        console.log("Full params");
        var params = {};
        req.params.split(", ").forEach((pair) => {
          const [key, value] = pair.split(": ");
          params[key] = value;
        });
      }
    }
    //const params = req.params ? JSON.parse(req.params) : "";
    var data = [];
    var isSeeded = req.seed ? true : false;

    if (isSeeded) {
      faker.setDefaultRefDate(new Date("2020-01-01"));
      for (let i = 0; i < req.count; i++) {
        faker.seed(Number(req.seed) + i);
        data.push(faker[req.category][req.func](params));
      };
    }
    else {
      for (let i = 0; i < req.count; i++) {
        data.push(faker[req.category][req.func](params));
      }
    }
    console.log("Sending data to client side");
    return JSON.stringify(data);
    } catch (e) {
      return '["Неверные параметры"]';
    }
}}

const { faker } = require("@faker-js/faker");

const blacklistedKeys = [
  "fake",
  "address",
  "mersenne",
  "name",
  "random",
  "unique",
  "definitions",
  "_locale",
  "_localeFallback",
  "locales",
];
const blacklistedSubkeys = { company: "companyName" };

module.exports = {
  getOptions: function () {
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
  }
};

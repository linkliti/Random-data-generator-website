const { faker } = require('@faker-js/faker');
module.exports = {
  getOptions: function () {
    const keys = Object.keys(faker);

    // Remove keys you don't want
    const keysToRemove = ['fake', 'unique', 'definitions', '_locale', '_localeFallback', 'locales'];
    const subKeysToRemove = [];
    const filteredKeys = keys.filter(key => !keysToRemove.includes(key));

    const parsedKeys = {};

    filteredKeys.forEach(key => {
      var subObject = faker[key];
      const filteredKeys = keys.filter(key => !keysToRemove.includes(key));
      var subKeys = Object.keys(subObject);
      parsedKeys[key] = [];
      subKeys.forEach(subkey => {
        if (typeof faker[key][subkey] === 'function')
          parsedKeys[key].push(subkey)
      })
    });

    return parsedKeys;
  }
};
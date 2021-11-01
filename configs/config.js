// const ENV = "development";
const ENV = "production";
let config = null;

if (ENV === "production") {
  config = require("./production");
} else if (ENV === "development") {
  config = require("./development");
} else {
  config = require("./development");
}

module.exports = config;

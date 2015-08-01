
var weather = require("./weather")

var zips = process.argv.slice(2);

zips.forEach(weather.get);



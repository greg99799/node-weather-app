
var weather = require("./weather")

var city = process.argv.slice(2);
// console.log(city[0]);
city.forEach(weather.getZipCode);

// weather.getZipCode("salt lake city", "ut");

// weather.get(myZip)




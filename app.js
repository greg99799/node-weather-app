
var weather = require("./weather")

// var city = process.argv.slice(2);

// city.forEach(weather.get);

var myZip = weather.getZipCode("sarasota", "fl");
console.log(myZip);
// weather.get(myZip)




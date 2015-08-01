
var weather = require("./weather")

var city = process.argv.slice(2);
console.log(process);
city.forEach(weather.getZipCode);

// weather.getZipCode("owatonna", "mn");

// weather.get(myZip)




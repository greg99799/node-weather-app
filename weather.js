var http = require("http");
var https = require("https");


//Print out message
function printMessage(title, temp) {
  var message = title + " ------------- " + temp + " degrees.";
  console.log(message);
}

//Print out error messages
function printError(error){
  console.error("We have a problem: " + error.message);
}



function getZipCode (city, state) {
  //connect to 'city to zip' API
  var apiKey = "aS5FtNNINJW3b9KRh18Cfxa8uudxDp7OidtL0huO0qRbAC2SEbuTJF2d9gKMFSAX"
  var request = https.get("https://www.zipcodeapi.com/rest/" + apiKey + "/city-zips." + "json" + "/" + city + "/" + state, function(response){
    var body = ""  
  //read data
    response.on("data", function(chunk){
      body += chunk;
    });
    response.on('end', function(){
      if (response.statusCode === 200) {
        try {
          //Parse the data
          var parsedBody = JSON.parse(body); 
          //gather all data values
          var usedZip = parsedBody.zip_codes[0];
          // console.log(body);
          // return usedZip;
          get(usedZip);
        } catch (error) {
            //Parse Error
            printError({message: "There was an error in getting location: " + city});
          }  
      } else {
          //Status Code error
          printError({message: "File not found"});
      }
    });
  });
}

function get(zipCode) {
  //Connect to API URL 
    var request = http.get('http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%22' + zipCode + '%22&format=json', function(response){
    var body = "";
    // console.log(request.path);

    //Read the data
    response.on('data', function(chunk){
      body += chunk;
          // console.log(body);
    });
    response.on('end', function(){
      if (response.statusCode === 200) {
        try {
          //Parse the data
          var parsedBody = JSON.parse(body); 
          //gather all data values
          var values = {
            title: parsedBody.query.results.channel.item.title,
            temp: parsedBody.query.results.channel.item.condition.temp,
          };
          // console.log(values.query.results.channel.item.title.condition.temp);

          // console.log(values.query.results.channel.item.title);
          //Print the data
          printMessage(values.title, values.temp);
        } catch (error) {
            //Parse Error
            printError({message: "There was an error in getting location " + zipCode + ". Zip code does not exist."});
          }  
      } else {
          //Status Code error
          printError({message: "There was an error in getting location " + zipCode});
      }
    });
    // console.log(response.statusCode)
    request.on("error", printError);
  });
} 
  

module.exports.getZipCode = getZipCode;
module.exports.get = get;



















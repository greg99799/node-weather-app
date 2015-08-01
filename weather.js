var http = require("http");


//Print out message
function printMessage(title, temp) {
  var message = title + ":" + 
  console.log(message);
}

//Print out error messages
function printError(error){
  console.error("We have a problem: " + error.message);
}


function get(zipCode) {
  //Connect to API URL (http://teamtreehouse.com/username.json)
      var request = http.get('http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%22' + zipCode + '%22&format=json', function(response){
      var body = "";

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
            console.log(parsedBody.query.results.channel.item.condition.temp);
            var values = {
              title: parsedBody.query.results.channel.item.title,
              temp: parsedBody.query.results.channel.item.condition.temp
            };
            // console.log(values.query.results.channel.item.title.condition.temp);
            console.log(values.title);

            // console.log(values.query.results.channel.item.title);
            //Print the data
            // printMessage(values.title, values.temp);
          } catch (error) {
              //Parse Error
              printError({message: "parsing error"});
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
  

module.exports.get = get;
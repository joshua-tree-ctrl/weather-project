// require js file included in assets/js
requirejs(['jquery'],
function   ($) {
  
//jQuery loaded and can be used here now.
///////////////////////////////// BASE DIVS ///////////////////////////////// 
$('head').append('<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700,800,900&display=swap" rel="stylesheet">');
$('head').append('  <link rel="stylesheet" href="assets/css/style.css">');
$('body').append('<div class="container">  </div>');
$('.container').append('<div class="weather">  </div>');

///////////////////////////////// AJAX ///////////////////////////////// 

//First variable of getLocation is an AJAX call (promises built in ajax via jquery instead of writing new Promise in vanilla)
//This data is then used on the ajax call variable getWeather. 

let getLocation =  $.ajax({
  type: "GET",
  url: "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572 ",
  dataType:'json'
});

//Using THEN().. Pass any parameter into the function of the then() to return the data from the getLocation (1st call) ajax call variable. 
//let getWeather = getLocation.then() function, which will return the weather (2nd ajax call) utilising data from the first ajax call (chained). 
let getWeather = getLocation.then((location) => {
  return $.ajax({
    type: "GET",
    url: `https://api.weatherbit.io/v2.0/forecast/daily?city=${location.city},${location.country_code}&days=4&key=959dca19c5aa40b084f4991fa3a58145`,
    success: () => {
      $('.weather').children('.loading').remove();
    },
    beforeSend: () => {
      $(".weather").prepend(
        '<div class="loading"><img src="assets/img/ajax-loader-weather.gif" alt="Loading" /></div>'
      );
    }
  });
}); 

//Fail 
getWeather.fail(()=>{alert("There was an error getting weather data.");});

//Passed results from getWeather into parameter 'weather' via done(). 
//Use ajax promise.done data to build UI
getWeather.done((promiseDone) => {
//console.log(promiseDone); // It first starts as an Object with a data key that contains 4 arrays as a property, amongst other keys/properties. 
///////////////////////////////// UI BUILD ///////////////////////////////// 


// Object destructuring assignment
let {city_name:city, country_code:code, data, timezone:time, ...rest} = promiseDone; 
//console.log(data); //Then object destructuring occurs which pulls the required keys and places them into their own variables. You dont need to loop city, code, timezone.
//You place data (the key with a 4 property array, which contain an object in each array point) into its own variable. 

//As destructuring is not a loop but simply extracting chosen key/properties, you could not then unpack each object key/property at each point in the 4 array, you'd only end up removing array keys like [0] or [2]. 
//You couldn't object destructure as above either, as it is not an object yet, its an array. 

//Instead we use map() on data
//Must wrap the returning object literal into parentheses. Otherwise curly braces will be considered to denote the function’s body. The following works:
let weatherInfo = data.map(({temp, max_temp, min_temp, weather, valid_date}) => ({temp, max_temp, min_temp, weather, valid_date})); 
//.map() can be used to iterate through objects in an array and in a similar fashion to traditional arrays, *modify the content of each individual object *and return a new array. weatherInfo above says to map the data array containing objects, and to take those key/properties and place only them into new array. 
// those parameters are the original key/property values, and store only these into weatherInfo. Map takes an array  and creates a new array returning the object keys/properties required 
//console.log(weatherInfo);


//Display Location
$(".weather").append(
  `<div class="weather__location"> ${city}, ${code} </div>` 
 );

//Rounding temperature function
tempRound = (temp) => {
  return Math.round(temp);
};

//Date formatting
 let options = {
    month: "numeric",
    day: "numeric"
  };

  
//Loop object with es6 for-of to display 4 days of weather data. 
for (const w of weatherInfo) {
   
    //Format date for each date looped
    let weatherDate = w.valid_date;
    let dateParse = new Date(weatherDate);
    let dateFormatted = dateParse.toLocaleDateString("en-GB", options);

    //Display formatted date
    $(".weather").append(
      `<div class="weather__date"> ${dateFormatted}  </div>`
    );

    //Icon
    $(".weather").append(
      `<img class="weather__icon" src="https://www.weatherbit.io/static/img/icons/${w.weather.icon}.png" alt="weather icon" ></img>`
    );
   
    //Weather Description 
    $(".weather").append(`<div class="weather__desc">  ${w.weather.description} </div>`
    );

    //Temperature
    $(".weather").append(
      `<div class="weather__temp"> ${tempRound(w.temp)}&#176; </div>`
    );

    //Minimum and maximum temperature 
    $(".weather").append(`<div class="weather__temp__minmax">   H: ${tempRound(w.max_temp)}&#176; L:${tempRound(w.min_temp)} &#176; </div>`
    );
  }
});

});

 
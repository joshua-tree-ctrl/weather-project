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
let getWeather = getLocation.then(function(location) {
  return $.ajax({
    type: "GET",
    url: `https://api.weatherbit.io/v2.0/forecast/daily?city=${location.city},${location.country_code}&days=4&key=959dca19c5aa40b084f4991fa3a58145`,
    success: function () {
      $('.weather').children('.loading').remove();
    },
    beforeSend: function () {
      $(".weather").prepend(
        '<div class="loading"><img src="assets/img/ajax-loader-weather.gif" alt="Loading" /></div>'
      );
    }
  });
}); 

//Fail 
getWeather.fail(function(){alert("There was an error getting weather data.");});

//Passed results from getWeather into parameter 'weather' via done(). 
//Use ajax promise.done data to build UI
getWeather.done(function(promiseDone){

///////////////////////////////// UI BUILD ///////////////////////////////// 

// Object destructuring assignment
let {city_name:city, country_code:code, data, timezone:time, ...rest} = promiseDone; //Pulling data required and assigning to new keys
//Mapping just the data key properties
let weatherInfo = data.map(({temp, max_temp, min_temp, weather, valid_date}) => ({temp, max_temp, min_temp, weather, valid_date})); 



//Display Location
$(".weather").append(
  `<div class="weather__location"> ${city}, ${code} </div>` 
 );

//Rounding temperature function
tempRound = temp => {
  return Math.round(temp);
};

//Date formatting
 let options = {
    month: "numeric",
    day: "numeric"
  };

//Loop object with es6 for-of to display 4 days of weather data. 

// Array keys for CSS
/* let keyNumbers = weatherInfo.keys();
for (k of keyNumbers) {
  $(".weather").append(
    `<div class="weather__date weather__date--${k}">  </div>`
  );
} */ 

for (const w of weatherInfo) {
    console.log(w);
  
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
   
    //Weather Descrip 
    $(".weather").append(`<div class="weather__desc">  ${w.weather.description} </div>`
    );

    //Temp
    $(".weather").append(
      `<div class="weather__temp"> ${tempRound(w.temp)}&#176; </div>`
    );

    //MinMax temp
    $(".weather").append(`<div class="weather__temp__minmax">   H: ${tempRound(w.max_temp)}&#176; L:${tempRound(w.min_temp)} &#176; </div>`
    );
  }
});

});

 
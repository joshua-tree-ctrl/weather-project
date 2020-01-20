
/*
NOT NEEDED????
requirejs.config({
  //By default load any module IDs from js/lib
  baseUrl: 'assets/js',
  //except, if the module ID starts with "app",
  //load it from the js/app directory. paths
  //config is relative to the baseUrl, and
  //never includes a ".js" extension since
  //the paths config could be for a directory.
  
}); */

// require js file included in assets/js
requirejs(['jquery'],
function   ($) {
  //jQuery loaded and can be used here now.

// Your jQuery Code
//Create base divs
$('head').append('<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700,800,900&display=swap" rel="stylesheet">');
$('head').append('  <link rel="stylesheet" href="assets/css/style.css">');
$('body').append('<div class="container">  </div>');
$('.container').append('<div class="weather">  </div>');


///////////////////////////////// AJAX ///////////////////////////////// 

//Callback function, AJAX Calls (.then chaining)
function ajaxCalls(handleData) {
  $.ajax({
    type: "GET",
    url: "https://geolocation-db.com/jsonp/0f761a30-fe14-11e9-b59f-e53803842572 ",
    jsonpCallback: "callback",
    dataType: "jsonp",
   // success: function (weather) {
        //console.log(weather);
   // },
    beforeSend: function () {
      console.log("loading");
    },
    error: function () {
      alert("There was an error getting location data.");
    }
  }).then(function(location) { //then use 1st ajax data for 2nd call
    return $.ajax({
        type: "GET",
        url: "https://api.weatherbit.io/v2.0/forecast/daily?city=" +
          location.city +
          "," +
          location.country_code +
          "&days=4&key=959dca19c5aa40b084f4991fa3a58145",
        success: function (weather) {
        handleData(weather); //callback
          $('.weather').children('.loading').remove();
        },
        beforeSend: function () {
          $(".weather").prepend(
            '<div class="loading"><img src="assets/img/ajax-loader-weather.gif" alt="Loading" /></div>'
          );
        },
        error: function () {
          alert("There was an error getting weather data.");
        }
      });
  });
}

///////////////////////////////////////////////////////////////////////////// 









///////////////////////////////// UI BUILD ///////////////////////////////// 

//Use ajax callback data to build UI
ajaxCalls(function(weather){


//Rounding temperature function
tempRound = temp => {
  return Math.round(temp);
};

//Date formatting//
 let options = {
    month: "numeric",
    day: "numeric"
  };

//Declare object, create key/value pairs for tidier implementation of data results from api
  let weatherObject = {};
  weatherObject["city"] = weather.city_name;
  weatherObject["code"] = weather.country_code;
  weatherObject["data"] = weather.data;
  weatherObject["time"] = weather.timezone;

 //Display Location
$(".weather").append(
  '<div class="weather__location" > ' + weatherObject.city + ", " + weatherObject.code  + '</div>'
 );

  //Loop object to display 4 days of weather data. 
  for (let i = 0; i < weatherObject.data.length; i++) {
    
    //Format date for each date looped
    let weatherDate = weatherObject.data[i].valid_date;
    let dateParse = new Date(weatherDate);
    let dateFormatted = dateParse.toLocaleDateString("en-GB", options);

    //Display formatted date
    $(".weather").append(
      '<div class="weather__date weather__date--' +
      i +
      '">  ' +
      dateFormatted +
      "       </div>"
    );

    //Icon
    $(".weather").append(
      '<img class="weather__icon weather__icon--' +
      i +
      '" src="https://www.weatherbit.io/static/img/icons/' +
      weatherObject.data[i].weather.icon +
      '.png" alt="weather icon" ></img>'
    );
   
    //Weather Descrip 
    $(".weather").append(
      '<div class="weather__desc weather__desc--' +
      i +
      '"> ' +
      weatherObject.data[i].weather.description +
      "</div>"
    );

    //Temp
    $(".weather").append(
      '<div class="weather__temp weather__temp--' +
      i +
      '"> ' +
      tempRound(weatherObject.data[i].temp) + "&#176;" +
      "</div>"
    );

    //MinMax temp
    $(".weather").append(
      '<div class="weather__temp__minmax weather__temp__minmax--' +
      i +
      '">   H: ' +
      tempRound(weatherObject.data[i].max_temp) + "&#176;" +  " L: " + tempRound(weatherObject.data[i].min_temp) + "&#176;" +
      "</div>"
    );
  }
  //return object from func
 // return weatherObject; //doesnt seem to be needed?
});

//////////////////////////////////////////////////////////////////////// 


  
});


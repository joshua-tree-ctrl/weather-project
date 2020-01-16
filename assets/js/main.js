console.log("Hello World");
var weatherData;

// Initial AJAX Call to Geolocate user, on success of obtaining data, chain second AJAX call and add the location.city to the AJAX URL. 
$.ajax({
    type:"GET",
    url: " https://geolocation-db.com/jsonp/0f761a30-fe14-11e9-b59f-e53803842572 ",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(location) {
    console.log(location);
     //Open Weather Map API AJAX Call inside geolocation API, as the geolocation call is in jsonp data type which does not support synchronous operation, so I cannot simply pass initial ajax call as false. Could do callback function with ajax to obtain data, and then build the html from that callback function data? alternative could be handlebars?
$.ajax({
    type: "GET",
    url:"https://api.openweathermap.org/data/2.5/weather?q=" + location.city + "&units=metric&appid=8ec99075200cb619dd999c05b1906c24",
    //url:"https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=8ec99075200cb619dd999c05b1906c24",
    success: function(weather) {
    console.log(weather);
    console.log(weather.weather[0].icon);
        weatherData=weather; //could store response in global variable, but as this is asynchronous (happens regardless in background), the variable wont be filled/usable until call is complete and therefore may create page load issues. Can test later if required. 
    $('h1').html(weather.name + " " + weather.main.temp + " " + weather.main.temp + " " + weather.main.temp_max + " " + weather.main.temp_min + " " + weather.weather[0].main + " " + weather.weather[0].description );
    $('.weather__icon').append("<img src=\"http://openweathermap.org/img/wn/"  + weather.weather[0].icon + "@2x.png\" alt=\"image weather\" class=\"weather__icon--img\">");
     
   
    },
    beforeSend: function() {
    console.log("loading");
    },
    error: function() {
      alert("There was an error getting weather data.");
    }
  });
    },
    beforeSend: function() {
        console.log("loading");
        },
        error: function() {
          alert("There was an error getting location data.");
        }
  });
  

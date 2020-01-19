 //Ajax location function 
ajaxLocation = () => {
  return $.ajax({
    type:"GET",
    url: "https://geolocation-db.com/jsonp/0f761a30-fe14-11e9-b59f-e53803842572 ",
    jsonpCallback: "callback",
    dataType: "jsonp",
    //finds location without needing success here 
  //  success: function(location) {
   // console.log(location);
  //  },
    beforeSend: function() {
        //console.log("loading");
        },
        error: function() {
          alert("There was an error getting location data.");
        }
  });
};


//jQuery Promise, when ajaxLocation() is done, pass results of ajaxLocation() to location parameter 
weatherFunc = () => {
$.when(ajaxLocation()).done(function(location) {
//Use ajaxLocation function results stored in location to provide location to URL string for weather API call
$.ajax({
  type: "GET",
  url:"https://api.weatherbit.io/v2.0/forecast/daily?city="+location.city+","+location.country_code+"&days=4&key=959dca19c5aa40b084f4991fa3a58145",
  //url:"https://api.weatherbit.io/v2.0/forecast/daily?city=London,GB&days=3&key=959dca19c5aa40b084f4991fa3a58145",
  success: function(weather) {
 // console.log(weather);
   }, 
  beforeSend: function() {
 // console.log("loading");
  },
  error: function() {
    alert("There was an error getting weather data.");
  }
});
});
}



$.when(weatherFunc()).done(function(weather) {

  console.log(weather);

});

//ROUNDING TEMP FUNCTION
tempRound = (temp) => {
  return Math.round(temp);
 };







/*

// Weatherbit AJAX Call to Geolocate. Success of geolocation chains to another AJAX call for weather. 
geoCall = () => { $.ajax({
    type:"GET",
    url: " https://geolocation-db.com/jsonp/0f761a30-fe14-11e9-b59f-e53803842572 ",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(location) {
    console.log(location);
    let location_city = location.city;
    let location_cc = location.country_code;
     //Open Weather Map API AJAX Call inside geolocation API, as the geolocation call is in jsonp data type which does not support synchronous operation, so I cannot simply pass initial ajax call as false. Could do callback function with ajax to obtain data, and then build the html from that callback function data? alternative could be handlebars?
    },
    beforeSend: function() {
        console.log("loading");
        },
        error: function() {
          alert("There was an error getting location data.");
        }
  });
} /*

geoCall();

/*
$.ajax({
    type: "GET",
    url:"https://api.weatherbit.io/v2.0/forecast/daily?city="+location_city+","+location_cc+"&days=4&key=959dca19c5aa40b084f4991fa3a58145",
    //url:"https://api.weatherbit.io/v2.0/forecast/daily?city=London,GB&days=3&key=959dca19c5aa40b084f4991fa3a58145",
    success: function(weather) {
    console.log(weather);

    //FUNCTION 
    loggedWeatherData = () => {
    //DATE FORMATTING OPTIONS
    let options = {  month: 'numeric', day: 'numeric' };
    
    //DECLARING AND CREATING KEY/VALUE PAIRS.
    let weatherObject = {};
    weatherObject['city'] = weather.city_name;
    weatherObject['code'] = weather.country_code;
    weatherObject['data'] = weather.data;
    weatherObject['time'] = weather.timezone;

    
    //LOCATION DISPLAY
      $('.weather__location').append("Area: " + weatherObject.city + ", " + weatherObject.code);
     

    //LOOPING WEATHER DATA FOR 4 DAYS 
    for (let i = 0; i < weatherObject.data.length; i++) {

    //DATE FORMATTING
    let weatherDate = weatherObject.data[i].valid_date;
    let dateParse = new Date(weatherDate);
    let dateFormatted = dateParse.toLocaleDateString("en-US", options); 
    

      //DATE LOOP 
      $('.weather__date').append('<div class="weather__date--' + i + '"> Dates:    ' + dateFormatted + '       </div>');
      //ICON LOOP
      $('.weather__icon').append('<img class="weather__icon--' + i + '" src="https://www.weatherbit.io/static/img/icons/' + weatherObject.data[i].weather.icon + '.png\" alt=\"weather icon\" ></img>'); 
      //DESC LOOP 
      $('.weather__desc').append('<div class="weather__desc--' + i +'">  Descriptions:  ' + weatherObject.data[i].weather.description + '</div>');
      //TEMP LOOP 
      $('.weather__temp').append('<div class="weather__temp--' + i +'">  Temps:  ' +  tempRound(weatherObject.data[i].temp) + '</div>');  
      //HIGH TEMP LOOP
      $('.weather__high').append('<div class="weather__temp__high--' + i +'">  Highs Of :   ' + tempRound(weatherObject.data[i].max_temp) + '</div>');  
      //LOW TEMP LOOP
      $('.weather__low').append('<div class="weather__temp__high--' + i +'"> Lows Of   : ' + tempRound(weatherObject.data[i].min_temp) + '</div>');  
        } 
      return weatherObject; 
    };

    loggedWeatherData();

     }, 
    beforeSend: function() {
    console.log("loading");
    },
    error: function() {
      alert("There was an error getting weather data.");
    }
  });
*/




  





  /*

      //url:"https://api.openweathermap.org/data/2.5/weather?q=" + location.city + "," + location.country_code + "&units=metric&appid=8ec99075200cb619dd999c05b1906c24",
    //url:"https://api.openweathermap.org/data/2.5/forecast?q=" + location.city + "," + location.country_code + "&units=metric&appid=8ec99075200cb619dd999c05b1906c24",

  // url:"https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=8ec99075200cb619dd999c05b1906c24",

    //console.log(weather.weather[0].icon);
        
    //weatherData=weather; //could store response in global variable, but as this is asynchronous (happens regardless in background), the variable wont be filled/usable until call is complete and therefore may create page load issues. Can test later if required. 

    // $('h1').html(weather.name + " " + weather.sys.country + " " + weather.main.temp + " " + weather.main.temp_max + " " + weather.main.temp_min + " " + weather.weather[0].main + " " + weather.weather[0].description );

    //$('.weather__icon').append("<img src=\"http://openweathermap.org/img/wn/"  + weather.weather[0].icon + "@2x.png\" alt=\"image weather\" class=\"weather__icon--img\">");

    
      loggedWeatherData = () => {
        let weatherArray = [];
        for (let i = 0; i < weather.list.length; i++) {
        weatherArray.push(weather.list[i]);
        
        console.log(weatherArray[i].main.temp);
        }
        return weatherArray;
      }
      loggedWeatherData();
      //console.log(loggedWeatherData());
   */
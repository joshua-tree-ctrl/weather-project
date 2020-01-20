//Creating divs
$('body').append('<div class="container">  </div>');
$('.container').append('<div class="weather">  </div>');

//Rounding temperature function
tempRound = temp => {
  return Math.round(temp);
};

//Ajax location function
ajaxLocation = () => {
  return $.ajax({
    type: "GET",
    url: "https://geolocation-db.com/jsonp/0f761a30-fe14-11e9-b59f-e53803842572 ",
    jsonpCallback: "callback",
    dataType: "jsonp",
    beforeSend: function () {
      console.log("loading");
    },
    error: function () {
      alert("There was an error getting location data.");
    }
  });
};

//jQuery Promise, when ajaxLocation() is done, pass results of ajaxLocation() to location parameter
$.when(ajaxLocation()).done(function (location) {
  //Use ajaxLocation function results stored in location to provide location to URL string for weather API call
  $.ajax({
    type: "GET",
    url: "https://api.weatherbit.io/v2.0/forecast/daily?city=" +
      location.city +
      "," +
      location.country_code +
      "&days=4&key=959dca19c5aa40b084f4991fa3a58145",
    //url:"https://api.weatherbit.io/v2.0/forecast/daily?city=London,GB&days=3&key=959dca19c5aa40b084f4991fa3a58145",
    success: function (weather) {

      $('.weather').children('.loading').remove();
      //FUNCTION
      loggedWeatherData = () => {
        //DATE FORMATTING OPTIONS
        let options = {
          month: "numeric",
          day: "numeric"
        };
        ///////////////////////////

        //DECLARING AND CREATING KEY/VALUE PAIRS.
        let weatherObject = {};
        weatherObject["city"] = weather.city_name;
        weatherObject["code"] = weather.country_code;
        weatherObject["data"] = weather.data;
        weatherObject["time"] = weather.timezone;
        ////////////////////////////////////////

        //LOCATION DISPLAY/////////////////////
        $(".weather").append(
         '<div class="weather__location" > ' + weatherObject.city + ", " + weatherObject.code  + '</div>'
        );
        //////////////////////////////////////

        //LOOPING WEATHER DATA FOR 4 DAYS
        for (let i = 0; i < weatherObject.data.length; i++) {
          
          //DATE FORMATTING
          let weatherDate = weatherObject.data[i].valid_date;
          let dateParse = new Date(weatherDate);
          let dateFormatted = dateParse.toLocaleDateString("en-GB", options);
          ////////////////////////////////////////////////////////////////////

          //DATE LOOP
          $(".weather").append(
            '<div class="weather__date weather__date--' +
            i +
            '">  ' +
            dateFormatted +
            "       </div>"
          );
          ///////////

          //ICON LOOP
          $(".weather").append(
            '<img class="weather__icon weather__icon--' +
            i +
            '" src="https://www.weatherbit.io/static/img/icons/' +
            weatherObject.data[i].weather.icon +
            '.png" alt="weather icon" ></img>'
          );
          ///////////

          //DESC LOOP
          $(".weather").append(
            '<div class="weather__desc weather__desc--' +
            i +
            '"> ' +
            weatherObject.data[i].weather.description +
            "</div>"
          );
          //////////
          
          //TEMP LOOP
          $(".weather").append(
            '<div class="weather__temp weather__temp--' +
            i +
            '"> ' +
            tempRound(weatherObject.data[i].temp) + "&#176;" +
            "</div>"
          );
          /////////

          //HIGH TEMP LOOP
          $(".weather").append(
            '<div class="weather__temp__minmax weather__temp__minmax--' +
            i +
            '">   H: ' +
            tempRound(weatherObject.data[i].max_temp) + "&#176;" +  " L: " + tempRound(weatherObject.data[i].max_temp) + "&#176;" +
            "</div>"
          );
          ///////

        }
        //RETURN OBJECT
        return weatherObject;
      };
      //CALL FUNCTION
      loggedWeatherData();
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


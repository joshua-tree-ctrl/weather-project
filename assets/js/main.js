
// Initial AJAX Call to Geolocate user, on success of obtaining data, chain second AJAX call and add the location.city to the AJAX URL. 
$.ajax({
    type:"GET",
    url: " https://geolocation-db.com/jsonp/0f761a30-fe14-11e9-b59f-e53803842572 ",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(location) {
   // console.log(location);

     //Open Weather Map API AJAX Call inside geolocation API, as the geolocation call is in jsonp data type which does not support synchronous operation, so I cannot simply pass initial ajax call as false. Could do callback function with ajax to obtain data, and then build the html from that callback function data? alternative could be handlebars?
$.ajax({
    type: "GET",
    url:"https://api.weatherbit.io/v2.0/forecast/daily?city=" + location.city + "," + location.country_code + "&days=3&key=959dca19c5aa40b084f4991fa3a58145",
    success: function(weather) {
    console.log(weather);

    loggedWeatherData = () => {

     /* //SETTING DATE & TIME IN SHORTHAND
      let date = new Date();
      var options = {  month: 'numeric', day: 'numeric' };
      let displayDate = date.toLocaleDateString("en-US", options); */ 
      
      let weatherObject = {};
      weatherObject['city'] = weather.city_name;
      weatherObject['code'] = weather.country_code;
      weatherObject['data'] = weather.data;
      weatherObject['time'] = weather.timezone;
     
      // console.log(weatherObject);
      $('.weather__location').append("Area " + weatherObject.city);
      $('.weather__location').append(" Country " + weatherObject.code);
     //DATE LOOP 
     //ICON LOOP
     //TEMP LOOP 
     //HIGH TEMP LOOP
     //LOW TEMP LOOP
     //https://www.weatherbit.io/static/img/icons/r01d.png EXAMPLE IMG 
      

      for (let i = 0; i < weatherObject.data.length; i++) {
      $('.weather__date').append('<div class="weather__date--' + i + '"> Dates:    ' + weatherObject.data[i].valid_date + '       </div>');
      $('.weather__icon').append("<img src=\"https://www.weatherbit.io/static/img/icons/"  + weatherObject.data[i].weather.icon + ".png\" alt=\"weather icon\" class=\"weather__icon--\">");  
      $('.weather__desc').append('<div class="weather__desc--' + i + '">  Descriptions:  ' + weatherObject.data[i].weather.description + '</div>');
      $('.weather__temp').append('<div class="weather__temp--' + i + '">  Temps:  ' + weatherObject.data[i].temp + '</div>');  
      $('.weather__temp').append('<div class="weather__temp__high--' + i + ' ">  Highs Of :   ' + weatherObject.data[i].max_temp + '</div>');  
      $('.weather__temp').append('<div class="weather__temp__high--' + i + ' "> Lows Of   : ' + weatherObject.data[i].min_temp + '</div>');  
        } 


      return weatherObject; 
    };
    loggedWeatherData();
    //console.log(loggedWeatherData());

      


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
///////////////////////////////// BASE DIVS ///////////////////////////////// 

//HEAD 
let head = document.getElementsByTagName("head")[0];
head.innerHTML = `<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700,800,900&display=swap" rel="stylesheet">`;
head.innerHTML += `<link rel="stylesheet" href="assets/css/style.css">`;

//BODY
let body = document.getElementsByTagName("body")[0];
body.innerHTML = '<div class="container"> </div>';
let container = document.querySelector('.container');
container.innerHTML = '<div class="weather"></div>';


///////////////////////////////// AJAX ///////////////////////////////// 

//First variable of getLocation is an AJAX call (promises built in ajax via jquery instead of writing new Promise in vanilla)
//This data is then used on the ajax call variable getWeather. 


const fetchPromise = fetch("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572");
fetchPromise.then(response => {
  return response.json();
}).then(location => {
  return fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${location.city},${location.country_code}&days=4&key=959dca19c5aa40b084f4991fa3a58145`)
}).then(response => {
  return response.json();
}).then(getWeather => {
//console.log(getWeather);
  
//Object destructuring occurs which pulls the required keys and places them into their own variables. You dont need to loop city, code, timezone.
//You place data (the key with a 4 property array, which contain an object in each array point) into its own variable. 
//As destructuring is not a loop but simply extracting chosen key/properties, you could not then unpack each object key/property at each point in the 4 array, you'd only end up removing array keys like [0] or [2]. 

// Object destructuring assignment
let {city_name:city, country_code:code, data, timezone:time} = getWeather; 

//You couldn't object destructure as above either, as it is not an object yet, its an array. 
//Instead we use map() on data. Must wrap the returning object literal into parentheses.
//.map() can be used to iterate through objects in an array - modify the content of each individual object - return a new array.  
let weatherInfo = data.map(({temp, max_temp, min_temp, weather, valid_date}) => ({temp, max_temp, min_temp, weather, valid_date})); 

//Select main div.weather 
let weatherSelector = document.querySelector(".weather");

//Display Location
weatherSelector.innerHTML = `<div class="weather__location"> ${city}, ${code} </div>`;

//Rounding temperature function
let tempRound = (temp) => {
  return Math.round(temp);
};

//Date formatting
 let options = {
    month: "numeric",
    day: "numeric"
  };

   
//Loop array of objects with es6 for-of to display 4 days of weather data. 
for (const w of weatherInfo) {
  
  //Format date for each date looped
  let weatherDate = w.valid_date;
  let dateParse = new Date(weatherDate);
  let dateFormatted = dateParse.toLocaleDateString("en-GB", options);

  //Display formatted date
   weatherSelector.innerHTML += `<div class="weather__date"> ${dateFormatted}  </div>` ;

  //Icon
   weatherSelector.innerHTML += `<img class="weather__icon" src="https://www.weatherbit.io/static/img/icons/${w.weather.icon}.png" alt="weather icon" ></img>` ;
 
  //Weather Description 
  weatherSelector.innerHTML += `<div class="weather__desc">  ${w.weather.description} </div>`;

  //Temperature
  weatherSelector.innerHTML +=  `<div class="weather__temp"> ${tempRound(w.temp)}&#176; </div>`;

  //Minimum and maximum temperature 
  weatherSelector.innerHTML +=`<div class="weather__temp__minmax">   H: ${tempRound(w.max_temp)}&#176; L: ${tempRound(w.min_temp)} &#176; </div>` ;
}

}).catch(error => {alert(error); })
 
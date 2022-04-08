// SEARCH AREA
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
var requestURL = "http://api.openweathermap.org/data/2.5/weather?q=seattle&appid=a1297b44ddf76ab119004cb7756bc90a";
var APIkey = "a1297b44ddf76ab119004cb7756bc90a"

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}



var cityInput = $('#city-search').val();

fetch(requestURL)
    .then(function (response) {
        console.log(response.json());
    })

// Click listener for search button
// Save search input to local file
// Display search history below form (clickable)

// WEATHER DATA
// City
// Date
// Temp
// Wind
// Humidity
// UV Index (color-coded)

// 5 DAY FORECAST CARDS
// Date
// Icon
// Temp
// Wind 
// Humidity
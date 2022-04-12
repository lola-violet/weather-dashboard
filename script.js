// SEARCH AREA

// API key
var apiKey = "a1297b44ddf76ab119004cb7756bc90a"

// Input Element Variable
var searchInputEl = $('input[name="city-search"]');

// Button Variable
var searchBtn = $('#search-btn');

// Search History Variables
var historyEl = $('#search-history');
var prevSearch = $('.prev-search');

// Data Display Variables
var cityName = $('#city-name');
var currDate = $('#current-date');
var currTemp = $('#current-temp');
var currWind = $('#current-wind');
var currHum = $('#current-humidity');
var uvIndex = $('#uv-index');

var day1 = $('#day-1');
var dateCardEl = $('.forecast');
var date = $('.date');
var temp = $('.temp');
var wind = $('.wind');
var hum = $('.humidity')

// Function to retrieve coordinates from city search
function getCoordinates() {
    // Required variables for fetch request
    var cityInput = searchInputEl.val();
    var requestGeoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" +cityInput+ "&appid=" +apiKey;
    // Fetch request for geocodes
    fetch(requestGeoUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // Using local storage to save latitude
        var searchLat = data[0].lat;
        localStorage.setItem("searchLat", searchLat);
        // Using local storage to save longitude
        var searchLon = data[0].lon;
        localStorage.setItem("searchLon", searchLon);
        // Set header text as name of city
        cityName.text(data[0].name);
        // Call function to fetch weather data
        getWeather();
    })
}

// Function to fetch weather data
function getWeather() {
    // Required variables for fetch request
    var searchLat = localStorage.getItem("searchLat");
    var searchLon = localStorage.getItem("searchLon");
    var requestOneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +searchLat+ "&lon=" +searchLon+ "&exclude=minutely,hourly,alerts&appid=" +apiKey+ "&units=imperial";
    // Fetch request
    fetch(requestOneCallUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        // Display current date
        var currUnix = moment.unix(data.current.dt).format("MM/DD/YYYY");
        currDate.text(currUnix);

        // Display current weather data
        currTemp.text("Temp: " + data.current.temp + "° F");
        currWind.text("Wind: " + data.current.wind_speed + " MPH");
        currHum.text("Humidity: " + data.current.humidity + "%");
        uvIndex.text("UV Index: " + data.current.uvi);

     
        dateCardEl.each(function() {
            var cardID = $(this).attr("id");
            var foreUnix = moment.unix(data.daily[cardID].dt).format("MM/DD/YYYY");
            $(this).children().eq(0).text(foreUnix);

            $(this).children().eq(2).text("Temp: " + data.daily[cardID].temp.day + "° F");
            $(this).children().eq(3).text("Wind: " + data.daily[cardID].wind_speed + " MPH");
            $(this).children().eq(4).text("Humidity: " + data.daily[cardID].humidity + "%");
        })
    })
}

// Fetch request for current weather data
function getCurrentWeather() {
    // Necessary variables for fetch request
    var cityInput = searchInputEl.val();
    var requestCurrentUrl = "http://api.openweathermap.org/data/2.5/weather?q=" +cityInput+ "&appid=" +apiKey+ "&units=imperial";
    // Fetching data
    fetch(requestCurrentUrl)
    .then(function (response) {
        return response.json();
    })
    // Displaying data
    .then(function (data) {
        console.log(data);
        cityName.text(data.name);
        currTemp.text("Temp: " + data.main.temp + "° F");
        currWind.text("Wind: " + data.wind.speed + " MPH");
        currHum.text("Humidity: " + data.main.humidity + "%");
    })
}

// Fetch request for 5-day forecast data
function getForecast() {
    // Necessary variables for fetch request
    var cityInput = searchInputEl.val();
    var requestForecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" +cityInput+ "&appid=" +apiKey+ "&units=imperial";
    // Fetching data
    fetch(requestForecastUrl)
    .then(function (response) {
        return response.json();
    })
    // Displaying data
    .then(function (data) {
        console.log(data);

        date.text(data.list[3].dt_txt);
        temp.text(data.list[3].main.temp);
        wind.text(data.list[3].wind.speed);
        hum.text(data.list[3].main.humidity);
    })
}

// Click listeners for search button
// To retreive geo coordinates
searchBtn.click(getCoordinates);
// // To display current weather data
// searchBtn.click(getCurrentWeather);
// // To display 5-day forecast
// searchBtn.click(getForecast);
// // To save search inputs into loval file
searchBtn.click(saveHistory);




// Save search input to local file
function saveHistory(event) {
    event.preventDefault();
    var timeNow = moment().format("HH:mm:ss");
    // var buttonID = 
    var cityInput = $(this).prev().val();
    localStorage.setItem(timeNow, cityInput);
    // var searchHist = $(this).prev().val();
    // var searchID = 01++;
    // localStorage.setItem(searchID, searchHist);
    
    
}

// Display search history below form (clickable)
// prevSearch.each(function() {
//     $(this).text(localStorage.getItem());
// })

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
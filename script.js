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

        // Display forecast weather data
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


// Click listeners for search button
// To retreive geo coordinates & weather data
searchBtn.click(getCoordinates);
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


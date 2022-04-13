# weather-dashboard
UWBC HW#6: Server-Side APIs: Weather Dashboard
<br>
<br>

# Description
A web application that allows users to search for a city & see that location's current weather & 5-day forecast. 
<br>
<br>

# Points of Interest
## Search Bar
Users can enter the name of any major city, instead of having to enter a city code or precise latitude & longitude. 
I utilized two APIs & local storage in order to make this possible. The first API returns location data for any given location based on the city's name. The latitude & longitude are then stored locally, where they can be retrieved by the second API. The second API returns current weather data as well as a 5-day forecast.
<br>

## Current Weather
When the user enters a city name and clicks the search button, current weather data for that location will appear in the large box. 
In addition to pulling current weather data from the One Call API, I incorporated Moment.JS to convert the data's Unix Timestamp into a readable date.
<br>

## 5-Day Forecast
Beneath the current weather box, the user will see 5 smaller boxes, each with a date & weather data for the next 5 days.
I used the One Call API & Moment.JS to show each date & its respective data. 
<br>
<br>

# Deployed Application
[Weather_Dashboard](https://lola-violet.github.io/weather-dashboard/)
<br>
<br>

# Usage
The user clicks into the search input, enters the name of a city and clicks the search button. Then, current weather & forecast data appear.  
<br>
<br>

![weather_dashboard_start](/images/weather_dashboard_start.png)
<br>

![weather_dashboard_data](/images/weather_dashboard_data.png)
<br>
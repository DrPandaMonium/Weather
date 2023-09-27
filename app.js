//29f7dbbd7470b28ced9e372d41098ace
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// Establish api key and url
const apiKey = '29f7dbbd7470b28ced9e372d41098ace';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';

// Get values of input and button so they can be searched

const searchBox = document.querySelector('.search input'); // This is the city
const searchBtn = document.querySelector('.search button');

// Get weather icon value in order to change it depending on weather conditions

const weatherIcon = document.querySelector('.weather-icon');

// New function will gather the information from the input and display them

async function checkWeather(city){
    // Response will be the url loaded it is the base url with the city name and the API key
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // if the city is invalid, return the error message
    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        // data is the information that comes back from the API fetch done at the beginning of the function
        let data = await response.json();

        // Change the html values based on the returned data from the API
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°F';
        // document.querySelector('.low').innerHTML = Math.round(data.main.temp_min) + '°F';
        // document.querySelector('.high').innerHTML = Math.round(data.main.temp_max) + '°F';
        // document.querySelector('.feels').innerHTML = Math.round(data.main.feels_like) + '°F';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

        // Change the condition image based on the data from the API
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = 'images/clouds.png';
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = 'images/clear.png';
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = 'images/rain.png';
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = 'images/drizzle.png';
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = 'images/mist.png';
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = 'images/snow.png';
        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
        console.log(data);
    }

}

// run checkWeather() whenever the submit button is clicked
searchBtn.addEventListener('click', ()=>{{
    checkWeather(searchBox.value);
}})

searchBox.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkWeather(searchBox.value);
    }
})


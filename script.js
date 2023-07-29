const input = document.querySelector('.inputbox');
const search = document.getElementById('search-button');
const image = document.querySelector('.weather-img');
const temp = document.querySelector('.temp');
const des = document.querySelector('.describe');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind-speed');

const weather_body = document.querySelector('.weather-body');
const location_not_found = document.querySelector('.location-not-found');

async function checkWeather(city) {
    const api_key = "57350f30ce13c9cbbb566c005c774f60";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    des.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${weather_data.wind.speed}Km/h`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            image.src = "/images/cloud.png";
            break;
        case 'Clear':
            image.src = "/images/clear.png";
            break;
        case 'Rain':
            image.src = "/images/rain.png";
            break;
        case 'Mist':
            image.src = "/images/mist.png";
            break;
        case 'Snow':
            image.src = "/images/snow.png";
            break;
    }

    console.log(weather_data);
}

search.addEventListener('click', () => {
    checkWeather(input.value);
})
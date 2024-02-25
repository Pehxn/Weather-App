const apiKey = "2c8d15780ade949bbd5b88a48822803d";
const locButton = document.querySelector(".loc-button");;;
const todayWeatherIcon = document.querySelector(".today-weather i");;;
const todayTemp = document.querySelector(".weather-temp");;;
const dayList = document.querySelector(".days-list");

const weatherIconMap ={
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'sun',
    '02n': 'moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'cloud-rain',
    '09n': 'cloud-rain',
    '10d': 'cloud-rain',
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning',
    '11n': 'cloud-lightning',
    '13d': 'cloud-snow',
    '13n': 'cloud-snow',
    '50d': 'water',
    '50n': 'water'
};

function fetchWeatherData (location){
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    fetch (apiUrl).then(response => response.json()).then(data =>{
        const todayWeather = data.list[0].weather[0].description;
        const todayTemperature = `${Math.round(data.list[0].main.temp)}°C`;
        const todayWeatherIconCode = data.list[0].weather[0].icon;

        todayInfo.querySelector('h2').textContent = new Date().toLocaleDatestring('en' , {weekday: 'long'});
        todayInfo.querySelector('span').textContent = new Date().toLocaleDatestring  ('en' , {day: 'lnumeric', month: 'long', year: 'numeric'});
        todayWeatherIcon.className = 'bx bx-${weatherIconMap[todayWeatherIconCode]}';
        todayTemp.textContent = todayTemperature;


        const locationElement = document.querySelector('todayInfo > div > span');
        locationElement.textContent = '%{data.city.name}, ${data.citycountry}';

        const weatherDescriptionElement = document.querySelector('.today-weather > h3');
        weatherDescriptionElement.textContent = todayWeather;


        //update today info in "day-info" section
        const todayPrecipitation = '${data.list[0].pop}%';
        const todayHumidity = '${data.list[0].main.humidity}%';
        const todayWindSpeed = '${data.list[0].wind.speed} Km/h';

        const dayInfoContainer = document.querySelector('.day-info');
        dayInfoContainer.innerHTML = `

        <div>
            <span class ="title">PRECIPITATION</span>
            <span class ="value">${todayPrecipitation}</span>
        </div>
        <div>
            <span class ="title">HUMIDITY</span>
            <span class ="value">${todayHumidity}</span>
        </div>
        <div>
            <span class ="title">WIND SPEED</span>
            <span class ="value">${todayWindSpeed}</span>
        </div>
        `;

        //update next 4 days weather
        const today = new Date();
        const nextDaysData = data.list.slice(1);

        const uniqueDays = new Set();
        let count = 0;
        daysList.innerHTML = '';
        for(const dayData of nextDaysData) {
            const forecastDate = new Date(dayData.dt_txt);
            const dayAbbreviations = forecastData.tolocaleDateString('en', {weekend:'short'});
            const dayTemp = `${Math.round(dayData.main.temp)}°C`;
            const iconCode = dayData.weather[0].icon;
        }

            //ensure the day isnt duplicate and today
            if(!uniqueDays.has(dayAbbreviations) && forecastDate.getDate() !== today.getDate()) {
                uniqueDays.add(dayAbbreviations)
                daysList.innerHTML +=`
                    <li>
                        <i class ='bx bx-${weatherIconMap[iconCode]}'></i>
                        <span>${dayAbbreviations}</span>
                        <span class = "day-temp">${dayTemp}</span>
                    </li>
                `;
                count++;
                
            }
            if (count === 4) break;
    }).catch(err => {
        alert(`error fetching weather data: ${error} (Api error)`);

    });
}



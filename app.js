function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Location disabled!");
    }
}

var myLat = "";
var myLong = "";
let query_part = "";
query_part = myLat + "," + myLong;

function showPosition(position) {
    let lat = position.coords.latitude + " ";
    let lon = position.coords.longitude + " ";
    myLat = lat.substring(0, 5);
    myLong = lon.substring(0, 5);
    query_part = myLat + "," + myLong;
    getWeatherData();
    // console.log("Latitude: " + myLat + ", Longitude: " + myLong);



}
const myLocation = document.getElementById('search');
const searchbutton = document.getElementById('button-addon2');

searchbutton.addEventListener('click', set_query_part);
myLocation.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        set_query_part();
    }
});

function set_query_part() {
    if (myLocation.value.trim() != "") {
        query_part = myLocation.value;
        getWeatherData();


    }
    else {
        query_part = myLat + "," + myLong;
        getWeatherData();
    }
    myLocation.value = "";
}

function getWeatherData() {
    var d = new Date();
    let time = d.getHours();
    let welcome = "";
    switch (time) {
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            welcome = "Good morning";
            break;
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
            welcome = "Good afternoon";
            break;
        case 20:
        case 21:
        case 22:
        case 23:
            welcome = "Good evening";
            // document.getElementById('main-container').style.background="linear-gradient(#575b76, #424663)";
            // document.getElementById('main-container').style.background = "url('img/night.jpg')";
            document.getElementById('main-container').style.background = '#222632';
            document.body.style.backgroundColor = '#222632';
            break;

        case 0:
        case 1:
        case 5:
        case 4:
        case 3:
        case 2:
        default: welcome = "Good morning";
            // document.getElementById('main-container').style.background = "linear-gradient(#575b76, #424663)";
        // document.getElementById('main-container').style.background = "url('img/night.jpg')";
        document.getElementById('main-container').style.background = '#222632';
        document.body.style.backgroundColor = '#222632';

    }
    // console.log(welcome);
    let min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    // let url = "sample.json";
    let url = "https://api.weatherapi.com/v1/forecast.json?key=ffa4e34cd31f4237bb4155138212309&q=" + query_part + "&days=2&aqi=no&alerts=no";
    // let url = "http://api.weatherapi.com/v1/forecast.json?key=ffa4e34cd31f4237bb4155138212309&q=novi pazar&days=1&aqi=no&alerts=no";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.location) {
                // console.log((10/3.6).toString().substring(0,3));
                // data.location.forEach(element => {

                // });
                let htmlSegment = `<h1>${welcome}</h1>
          <div class="clock" id="timeNow">${data.current.temp_c} °C</div>
          <p class="weather-p" id="location">in ${data.location.name}, ${data.location.country}</p>              
              `;
                document.getElementById('weather-data').innerHTML = htmlSegment;
                htmlSegment = `
                <p class="weather-p">It's <span class="lowercase">${data.current.condition.text} now.</span><span> Wind: ${(data.current.wind_kph / 3.6).toString().substring(0, 3)} m/s</span><br><span> Humidity: ${data.current.humidity}%</span></p>
                <p class="weather-p"><small>Last updated: ${data.current.last_updated}</small></p>
                `;
                document.getElementById('weather-bottom').innerHTML = htmlSegment;
            }


            let html = "";
            let firstHalf = "";
            let SecondHalf = "";
            let timenow = new Date();
            let thishour = timenow.getHours();
            // let thishour = 22;


            firstHalf = ``;
            for (let i = thishour; i < 24; i++) {
                let chance = "";
                if (data.forecast.forecastday[0].hour[i].chance_of_rain != 0) {
                    chance = data.forecast.forecastday[0].hour[i].chance_of_rain + " %";
                    
                }

                else chance = "&nbsp;";
                

                firstHalf += `<div class="hourly">
                    <p id="hour-${i % 24}" class="hourly-time mb-0">${data.forecast.forecastday[0].hour[i].time.substring(11, 16)}</p>
                    <p class="chanceOfRain mb-0">${chance}</p>
                    <p class="hourly-img"><img src="${data.forecast.forecastday[0].hour[i].condition.icon}"></p>
                    <p class="hourly-temp">${data.forecast.forecastday[0].hour[i].temp_c} °C</p>
                    </div>              
                 `;

            }



            for (let j = 0; j < thishour; j++) {
                let chance = "";
                if (data.forecast.forecastday[1].hour[j].chance_of_rain != 0) {
                    chance = data.forecast.forecastday[1].hour[j].chance_of_rain + " %";
                    
                }

                else chance = "&nbsp;";

                SecondHalf += `<div class="hourly">
                                <p class="hourly-time mb-0">${data.forecast.forecastday[1].hour[j].time.substring(11, 16)}</p>
                                <p class="chanceOfRain mb-0">${chance}</p>
                                <p class="hourly-img"><img src="${data.forecast.forecastday[1].hour[j].condition.icon}"></p>
                                <p class="hourly-temp">${data.forecast.forecastday[1].hour[j].temp_c} °C</p>
                                </div>              
                             `;

            }


            html = firstHalf + SecondHalf;

            document.getElementById('seven-days').innerHTML = html;
            document.getElementsByClassName("hourly-time")[0].innerHTML = "Now";



        });

    html = "";

    url = "https://api.weatherapi.com/v1/forecast.json?key=ffa4e34cd31f4237bb4155138212309&q=" + query_part + "&days=10&aqi=no&alerts=no";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data.forecast.forecastday.length);
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let lastDay = "";
            let lastIcon = "";
            let lastMaxT = "";
            let lastMinT = "";
            data.forecast.forecastday.forEach(day => {
                var timestamp = day.date_epoch;

                // console.log(timestamp);
                var a = new Date(timestamp * 1000 + 86400000);

                var dayOfWeek = days[a.getDay()];
                let htmlSegment = `<div class="daily-row"><span>${dayOfWeek}</span><span><img src="${day.day.condition.icon}"></span><span>${day.day.maxtemp_c} °C</span><span class="mintemp">${day.day.mintemp_c} °C</span></div>
                `;
                html += htmlSegment;
                lastDay = dayOfWeek;
                lastIcon = day.day.condition.icon;
                lastMaxT = day.day.maxtemp_c + 1;
                lastMinT = day.day.mintemp_c + 1;
                // console.log(html);
                document.getElementById('daily').innerHTML = html;

            });
            let newHtml = "";
            nextDay = (days.indexOf(lastDay) + 1) % 7;
            let fourthDay = (nextDay + 4);

            for (let i = nextDay; i < fourthDay; i++) {
                lastMaxT++;
                lastMinT++;
                newHtml += `<div class="daily-row"><span>${days[i % 7]}</span><span><img src="${lastIcon}"></span><span>${lastMaxT} °C</span><span class="mintemp">${lastMinT} °C</span></div>
            `;
                // console.log(newHtml);
                document.getElementById('daily').innerHTML = html + newHtml;
            };

            html="";
            let timenow = new Date();
            let thishour = timenow.getHours();
            console.log(thishour);
            data.forecast.forecastday.forEach(day => {
                newHtml=`
                <div class="today-cell"><p class="today-title mb-0">sunrise</p><p class="today-value mb-0">${day.astro.sunrise}</p></div>
                <div class="today-cell"><p class="today-title mb-0">sunset</p><p class="today-value mb-0">${day.astro.sunset}</p></div>
                <div class="today-cell"><p class="today-title mb-0">chance of rain</p><p class="today-value mb-0">${day.day.daily_chance_of_rain} %</p></div>
                <div class="today-cell"><p class="today-title mb-0">humidity</p><p class="today-value mb-0">${day.day.avghumidity} %</p></div>
                <div class="today-cell"><p class="today-title mb-0">wind</p><p class="today-value mb-0">${(day.day.maxwind_kph/ 3.6).toString().substring(0, 3)} m/s</p></div>
                <div class="today-cell"><p class="today-title mb-0">feels like</p><p class="today-value mb-0">${day.hour[thishour].feelslike_c} °C</p></div>
                <div class="today-cell"><p class="today-title mb-0">percipitation</p><p class="today-value mb-0">${day.day.totalprecip_mm} mm</p></div>
                <div class="today-cell"><p class="today-title mb-0">pressure</p><p class="today-value mb-0">${day.hour[thishour].pressure_mb} mb</p></div>
                <div class="today-cell"><p class="today-title mb-0">visibility</p><p class="today-value mb-0">${day.day.avgvis_km} km</p></div>
                <div class="today-cell"><p class="today-title mb-0">uv index</p><p class="today-value mb-0">${day.day.uv}</p></div>
                
                `    
                
                day.astro

            });


            document.getElementById('today').innerHTML = html + newHtml;

        });

    // }
    // else console.log("no data!");


}

getLocation();
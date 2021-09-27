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
    myLocation.value="";
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
            document.getElementById('main-container').style.background = "url(img/night.jpg) repeat-y";
            break;

        case 0:
        case 1:
        case 5:
        case 4:
        case 3:
        case 2:
        default: welcome = "Good morning";
        // document.getElementById('main-container').style.background="url(img/night2.jpg) repeat-y";

    }
    // console.log(welcome);
    let min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    // let url = "sample.json";
    let url = "https://api.weatherapi.com/v1/forecast.json?key=ffa4e34cd31f4237bb4155138212309&q=" + query_part + "&days=1&aqi=no&alerts=no";
    // let url = "http://api.weatherapi.com/v1/forecast.json?key=ffa4e34cd31f4237bb4155138212309&q=novi pazar&days=1&aqi=no&alerts=no";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.location) {
                // data.location.forEach(element => {

                // });
                let htmlSegment = `<h1>${welcome}</h1>
          <div class="clock" id="timeNow">${data.current.temp_c} °C</div>
          <p class="weather-p" id="location">in ${data.location.name}, ${data.location.country}</p>              
              `;
                document.getElementById('weather-data').innerHTML = htmlSegment;
                htmlSegment = `
                <p class="weather-p">It's <span class="lowercase">${data.current.condition.text} now.</span><span> Wind: ${data.current.wind_kph} m/s</span><br><span> Humidity: ${data.current.humidity}%</span></p>
                <p class="weather-p"><small>Last updated: ${data.current.last_updated}</small></p>
                `;
                document.getElementById('weather-bottom').innerHTML = htmlSegment;
            }

            // if (data.forecast) {
            let html = "";
            let forecastLength = data.forecast.forecastday.length;
            let hourLength = data.forecast.forecastday[0].hour.length;
            // console.log(forecastLength);
            // console.log(hourLength);
            // for (let i = 0; i <= forecastLength; i++) {
            //     for (let j = 0; j <= hourLength; j++) {
            //         // data.forecast.forecastday[i].hour[j].time;
            //         // let dan=data.forecast.forecastday[0];
            //         console.log(data.forecast.forecastday[i].hour[j].time);
            //         let htmlSegment = `<div class="hourly"><p>${data.forecast.forecastday[i].hour[j].time}</p></div>              
            //     `;
            //     html+=htmlSegment;
            //     }
            // }

            data.forecast.forecastday.forEach(day => {
                day.hour.forEach(hour => {
                    // console.log(hour.time);
                    let htmlSegment = `<div class="hourly">
                    <p class="hourly-time">${hour.time.substring(11, 16)}</p>
                    <p class="hourly-img"><img src="${hour.condition.icon}"></p>
                    <p class="hourly-temp">${hour.temp_c} °C</p>
                    </div>              
                 `;
                    html += htmlSegment;
                });

            });
            // console.log(html);
            document.getElementById('seven-days').innerHTML = html;

        });

    html = "";

    url = "https://api.weatherapi.com/v1/forecast.json?key=ffa4e34cd31f4237bb4155138212309&q=" + query_part + "&days=10&aqi=no&alerts=no";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data.forecast.forecastday.length);
            data.forecast.forecastday.forEach(day => {
                var timestamp = day.date_epoch;
                // console.log(timestamp);
                var a = new Date(timestamp * 1000);
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var dayOfWeek = days[a.getDay()];
                let htmlSegment = `<div class="daily-row"><span>${dayOfWeek}</span><span><img src="${day.day.condition.icon}"></span><span>${day.day.maxtemp_c} °C</span><span>${day.day.mintemp_c} °C</span></div>
                `;
                html += htmlSegment;
                // console.log(html);
                document.getElementById('daily').innerHTML = html;

            });

        });

    // }
    // else console.log("no data!");


}

getLocation();
const base_url = 'https://api.openweathermap.org/data/2.5/'
const weather_url = base_url + 'weather?q='
const forecast_url = base_url + 'forecast?q='
const api_key = '&APPID=1729a6b082fe1edb7990e2bea663bb38'

document.addEventListener('DOMContentLoaded', () => {
      let parent = document.querySelector('.display')

      let card1 = document.createElement('div')
      let card2 = document.createElement('div')
      let card3 = document.createElement('div')

      card1.classList.add('card-day')
      card1.classList.add('card-day')
      card2.classList.add('card-day')
      setLoading(card1)
      setLoading(card2)
      setLoading(card3)
      parent.appendChild(card1)
      parent.appendChild(card2)
      parent.appendChild(card3)

      fetchData('weather', 'London').then(data => {
            renderData(data, card1)
      })
      fetchData('weather', 'Nairobi').then(data => {
            renderData(data, card2)
      })
      fetchData('weather', 'New York').then(data => {
            renderData(data, card3)
      })

})

async function fetchData(type, city) {
      const url = type === 'weather' ? weather_url : forecast_url
      const response = await fetch(url + city + api_key)
      return await response.json()
}

function renderData(data, card) {
      const hours = new Date().getHours()
      const isDayTime = hours > 6 && hours < 20;
      const time = isDayTime ? 'Day' : 'Night'
      let parent = document.querySelector('.display')
      let classNm = 'card-' + time.toLocaleLowerCase()
      card.className = classNm
      let html = ''
      html = `
            <div class="time">${time}</div>
            <div class="city">${data.name}</div>
            <div class="desc">${data.weather[0].description}</div>
            <div class="details">
                  <div>
                        <div>Temperature</div>
                        <div>${data.temp}</div>
                  </div>
                  <div>
                        <div>Humidity</div>
                        <div>${data.humidity}</div>
                  </div>
                  <div>
                        <div>Wind Speed</div>
                        <div>${data.wind}</div>
                  </div>
            </div>
      `;
      let forecastBtn = document.createElement('div')
      forecastBtn.classList.add('btn')
      forecastBtn.innerHTML = 'forecast'
      forecastBtn.addEventListener('click', () => {
            console.log('forecast')
            fetchData('forecast', data.name).then(data => {
                  console.log(data)
                  renderForecast(data, card)
            })
      })
      removeLoading(card)
      card.innerHTML = html
      card.appendChild(forecastBtn)
      parent.appendChild(card)

}

function setLoading(card) {
      let html = `
      <div class="loading">
            Loading...
      </div>
      `
      card.innerHTML = html

}

function removeLoading(card) {
      card.innerHTML = ""
}

function renderForecast(data, card) {
      let description = data.list[0].weather[0].description
      console.log(description)
      console.log(data.list[0])
      card.innerHTML = description
      // console.log(data.list[0].weather[0].description)
      // console.log(card)
      // let html = ''
      // html = `
      //       <div class="time">Day</div>
      //       <div class="city">${data.name}</div>
      //       <div class="desc">${data.list[0].weather[0].description}</div>
      //       <div class="details">
      //             <div>
      //                   <div>Temperature</div>
      //                   <div>${data.temp}</div>
      //             </div>
      //             <div>
      //                   <div>Humidity</div>
      //                   <div>${data.humidity}</div>
      //             </div>
      //             <div>
      //                   <div>Wind Speed</div>
      //                   <div>${data.wind}</div>
      //             </div>
      //       </div>
      // `;
      // card.innerHTML = html
      // let forecastBtn = document.createElement('div')
      // forecastBtn.classList.add('btn')
      // forecastBtn.innerHTML = 'Current'
      // forecastBtn.addEventListener('click', () => {
      //       console.log('forecast')
      //       fetchData('weather', data.name).then(data => {
      //             console.log(data)
      //             renderData(data)
      //       })
      // })
      // card.appendChild(forecastBtn)
      // parent.appendChild(card)


}







// {
//       "cod": "200",
//       "message": 0,
//       "cnt": 40,
//       "list": [
//           {
//               "dt": 1662044400,
//               "main": {
//                   "temp": 294.65,
//                   "feels_like": 294.24,
//                   "temp_min": 294.65,
//                   "temp_max": 295.16,
//                   "pressure": 1019,
//                   "sea_level": 1019,
//                   "grnd_level": 1015,
//                   "humidity": 53,
//                   "temp_kf": -0.51
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 100
//               },
//               "wind": {
//                   "speed": 4.42,
//                   "deg": 85,
//                   "gust": 6.84
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-01 15:00:00"
//           },
//           {
//               "dt": 1662055200,
//               "main": {
//                   "temp": 294.09,
//                   "feels_like": 293.68,
//                   "temp_min": 293.93,
//                   "temp_max": 294.09,
//                   "pressure": 1018,
//                   "sea_level": 1018,
//                   "grnd_level": 1014,
//                   "humidity": 55,
//                   "temp_kf": 0.16
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 100
//               },
//               "wind": {
//                   "speed": 4.2,
//                   "deg": 74,
//                   "gust": 8.26
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-01 18:00:00"
//           },
//           {
//               "dt": 1662066000,
//               "main": {
//                   "temp": 291.91,
//                   "feels_like": 291.51,
//                   "temp_min": 291.91,
//                   "temp_max": 291.91,
//                   "pressure": 1017,
//                   "sea_level": 1017,
//                   "grnd_level": 1014,
//                   "humidity": 64,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 803,
//                       "main": "Clouds",
//                       "description": "broken clouds",
//                       "icon": "04n"
//                   }
//               ],
//               "clouds": {
//                   "all": 54
//               },
//               "wind": {
//                   "speed": 4.29,
//                   "deg": 57,
//                   "gust": 10.61
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-01 21:00:00"
//           },
//           {
//               "dt": 1662076800,
//               "main": {
//                   "temp": 290.54,
//                   "feels_like": 290.35,
//                   "temp_min": 290.54,
//                   "temp_max": 290.54,
//                   "pressure": 1016,
//                   "sea_level": 1016,
//                   "grnd_level": 1013,
//                   "humidity": 77,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 802,
//                       "main": "Clouds",
//                       "description": "scattered clouds",
//                       "icon": "03n"
//                   }
//               ],
//               "clouds": {
//                   "all": 47
//               },
//               "wind": {
//                   "speed": 3.63,
//                   "deg": 47,
//                   "gust": 10.72
//               },
//               "visibility": 10000,
//               "pop": 0.02,
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-02 00:00:00"
//           },
//           {
//               "dt": 1662087600,
//               "main": {
//                   "temp": 290.11,
//                   "feels_like": 289.92,
//                   "temp_min": 290.11,
//                   "temp_max": 290.11,
//                   "pressure": 1015,
//                   "sea_level": 1015,
//                   "grnd_level": 1012,
//                   "humidity": 79,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 803,
//                       "main": "Clouds",
//                       "description": "broken clouds",
//                       "icon": "04n"
//                   }
//               ],
//               "clouds": {
//                   "all": 62
//               },
//               "wind": {
//                   "speed": 1.84,
//                   "deg": 359,
//                   "gust": 3.93
//               },
//               "visibility": 10000,
//               "pop": 0.2,
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-02 03:00:00"
//           },
//           {
//               "dt": 1662098400,
//               "main": {
//                   "temp": 290.36,
//                   "feels_like": 290.2,
//                   "temp_min": 290.36,
//                   "temp_max": 290.36,
//                   "pressure": 1013,
//                   "sea_level": 1013,
//                   "grnd_level": 1010,
//                   "humidity": 79,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 803,
//                       "main": "Clouds",
//                       "description": "broken clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 80
//               },
//               "wind": {
//                   "speed": 2.67,
//                   "deg": 36,
//                   "gust": 7.59
//               },
//               "visibility": 10000,
//               "pop": 0.12,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-02 06:00:00"
//           },
//           {
//               "dt": 1662109200,
//               "main": {
//                   "temp": 295.16,
//                   "feels_like": 294.83,
//                   "temp_min": 295.16,
//                   "temp_max": 295.16,
//                   "pressure": 1013,
//                   "sea_level": 1013,
//                   "grnd_level": 1010,
//                   "humidity": 54,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 99
//               },
//               "wind": {
//                   "speed": 3.6,
//                   "deg": 79,
//                   "gust": 6.27
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-02 09:00:00"
//           },
//           {
//               "dt": 1662120000,
//               "main": {
//                   "temp": 298.45,
//                   "feels_like": 298.08,
//                   "temp_min": 298.45,
//                   "temp_max": 298.45,
//                   "pressure": 1012,
//                   "sea_level": 1012,
//                   "grnd_level": 1009,
//                   "humidity": 40,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 99
//               },
//               "wind": {
//                   "speed": 3.65,
//                   "deg": 82,
//                   "gust": 4.75
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-02 12:00:00"
//           },
//           {
//               "dt": 1662130800,
//               "main": {
//                   "temp": 297.49,
//                   "feels_like": 297.1,
//                   "temp_min": 297.49,
//                   "temp_max": 297.49,
//                   "pressure": 1010,
//                   "sea_level": 1010,
//                   "grnd_level": 1007,
//                   "humidity": 43,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 92
//               },
//               "wind": {
//                   "speed": 3.86,
//                   "deg": 96,
//                   "gust": 5.11
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-02 15:00:00"
//           },
//           {
//               "dt": 1662141600,
//               "main": {
//                   "temp": 294.35,
//                   "feels_like": 294.09,
//                   "temp_min": 294.35,
//                   "temp_max": 294.35,
//                   "pressure": 1009,
//                   "sea_level": 1009,
//                   "grnd_level": 1006,
//                   "humidity": 60,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 96
//               },
//               "wind": {
//                   "speed": 2.4,
//                   "deg": 96,
//                   "gust": 5.03
//               },
//               "visibility": 10000,
//               "pop": 0.08,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-02 18:00:00"
//           },
//           {
//               "dt": 1662152400,
//               "main": {
//                   "temp": 293.32,
//                   "feels_like": 293.19,
//                   "temp_min": 293.32,
//                   "temp_max": 293.32,
//                   "pressure": 1009,
//                   "sea_level": 1009,
//                   "grnd_level": 1006,
//                   "humidity": 69,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 500,
//                       "main": "Rain",
//                       "description": "light rain",
//                       "icon": "10n"
//                   }
//               ],
//               "clouds": {
//                   "all": 87
//               },
//               "wind": {
//                   "speed": 1.64,
//                   "deg": 68,
//                   "gust": 4.62
//               },
//               "visibility": 10000,
//               "pop": 0.42,
//               "rain": {
//                   "3h": 0.21
//               },
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-02 21:00:00"
//           },
//           {
//               "dt": 1662163200,
//               "main": {
//                   "temp": 292.01,
//                   "feels_like": 291.86,
//                   "temp_min": 292.01,
//                   "temp_max": 292.01,
//                   "pressure": 1008,
//                   "sea_level": 1008,
//                   "grnd_level": 1005,
//                   "humidity": 73,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 803,
//                       "main": "Clouds",
//                       "description": "broken clouds",
//                       "icon": "04n"
//                   }
//               ],
//               "clouds": {
//                   "all": 70
//               },
//               "wind": {
//                   "speed": 1.33,
//                   "deg": 84,
//                   "gust": 1.55
//               },
//               "visibility": 10000,
//               "pop": 0.34,
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-03 00:00:00"
//           },
//           {
//               "dt": 1662174000,
//               "main": {
//                   "temp": 291.19,
//                   "feels_like": 291.03,
//                   "temp_min": 291.19,
//                   "temp_max": 291.19,
//                   "pressure": 1007,
//                   "sea_level": 1007,
//                   "grnd_level": 1004,
//                   "humidity": 76,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 500,
//                       "main": "Rain",
//                       "description": "light rain",
//                       "icon": "10n"
//                   }
//               ],
//               "clouds": {
//                   "all": 65
//               },
//               "wind": {
//                   "speed": 1.35,
//                   "deg": 126,
//                   "gust": 3.96
//               },
//               "visibility": 10000,
//               "pop": 0.28,
//               "rain": {
//                   "3h": 0.27
//               },
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-03 03:00:00"
//           },
//           {
//               "dt": 1662184800,
//               "main": {
//                   "temp": 290.15,
//                   "feels_like": 290.13,
//                   "temp_min": 290.15,
//                   "temp_max": 290.15,
//                   "pressure": 1007,
//                   "sea_level": 1007,
//                   "grnd_level": 1004,
//                   "humidity": 85,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 802,
//                       "main": "Clouds",
//                       "description": "scattered clouds",
//                       "icon": "03d"
//                   }
//               ],
//               "clouds": {
//                   "all": 41
//               },
//               "wind": {
//                   "speed": 1.41,
//                   "deg": 143,
//                   "gust": 4.4
//               },
//               "visibility": 10000,
//               "pop": 0.12,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-03 06:00:00"
//           },
//           {
//               "dt": 1662195600,
//               "main": {
//                   "temp": 294.21,
//                   "feels_like": 294.2,
//                   "temp_min": 294.21,
//                   "temp_max": 294.21,
//                   "pressure": 1008,
//                   "sea_level": 1008,
//                   "grnd_level": 1005,
//                   "humidity": 70,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 500,
//                       "main": "Rain",
//                       "description": "light rain",
//                       "icon": "10d"
//                   }
//               ],
//               "clouds": {
//                   "all": 16
//               },
//               "wind": {
//                   "speed": 1.34,
//                   "deg": 167,
//                   "gust": 2.55
//               },
//               "visibility": 10000,
//               "pop": 0.32,
//               "rain": {
//                   "3h": 0.39
//               },
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-03 09:00:00"
//           },
//           {
//               "dt": 1662206400,
//               "main": {
//                   "temp": 296.32,
//                   "feels_like": 296.26,
//                   "temp_min": 296.32,
//                   "temp_max": 296.32,
//                   "pressure": 1008,
//                   "sea_level": 1008,
//                   "grnd_level": 1005,
//                   "humidity": 60,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 501,
//                       "main": "Rain",
//                       "description": "moderate rain",
//                       "icon": "10d"
//                   }
//               ],
//               "clouds": {
//                   "all": 49
//               },
//               "wind": {
//                   "speed": 2.31,
//                   "deg": 200,
//                   "gust": 3.16
//               },
//               "visibility": 10000,
//               "pop": 0.72,
//               "rain": {
//                   "3h": 3.23
//               },
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-03 12:00:00"
//           },
//           {
//               "dt": 1662217200,
//               "main": {
//                   "temp": 296.93,
//                   "feels_like": 296.77,
//                   "temp_min": 296.93,
//                   "temp_max": 296.93,
//                   "pressure": 1008,
//                   "sea_level": 1008,
//                   "grnd_level": 1005,
//                   "humidity": 54,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 500,
//                       "main": "Rain",
//                       "description": "light rain",
//                       "icon": "10d"
//                   }
//               ],
//               "clouds": {
//                   "all": 72
//               },
//               "wind": {
//                   "speed": 3.63,
//                   "deg": 219,
//                   "gust": 4.42
//               },
//               "visibility": 10000,
//               "pop": 0.58,
//               "rain": {
//                   "3h": 1.15
//               },
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-03 15:00:00"
//           },
//           {
//               "dt": 1662228000,
//               "main": {
//                   "temp": 294.27,
//                   "feels_like": 293.8,
//                   "temp_min": 294.27,
//                   "temp_max": 294.27,
//                   "pressure": 1009,
//                   "sea_level": 1009,
//                   "grnd_level": 1006,
//                   "humidity": 52,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 86
//               },
//               "wind": {
//                   "speed": 4.44,
//                   "deg": 225,
//                   "gust": 6.97
//               },
//               "visibility": 10000,
//               "pop": 0.55,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-03 18:00:00"
//           },
//           {
//               "dt": 1662238800,
//               "main": {
//                   "temp": 291.59,
//                   "feels_like": 291.13,
//                   "temp_min": 291.59,
//                   "temp_max": 291.59,
//                   "pressure": 1011,
//                   "sea_level": 1011,
//                   "grnd_level": 1008,
//                   "humidity": 63,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04n"
//                   }
//               ],
//               "clouds": {
//                   "all": 100
//               },
//               "wind": {
//                   "speed": 2.71,
//                   "deg": 229,
//                   "gust": 6.75
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-03 21:00:00"
//           },
//           {
//               "dt": 1662249600,
//               "main": {
//                   "temp": 290.8,
//                   "feels_like": 290.42,
//                   "temp_min": 290.8,
//                   "temp_max": 290.8,
//                   "pressure": 1012,
//                   "sea_level": 1012,
//                   "grnd_level": 1009,
//                   "humidity": 69,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04n"
//                   }
//               ],
//               "clouds": {
//                   "all": 100
//               },
//               "wind": {
//                   "speed": 1.4,
//                   "deg": 179,
//                   "gust": 2.99
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-04 00:00:00"
//           },
//           {
//               "dt": 1662260400,
//               "main": {
//                   "temp": 290.23,
//                   "feels_like": 289.8,
//                   "temp_min": 290.23,
//                   "temp_max": 290.23,
//                   "pressure": 1012,
//                   "sea_level": 1012,
//                   "grnd_level": 1009,
//                   "humidity": 69,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04n"
//                   }
//               ],
//               "clouds": {
//                   "all": 100
//               },
//               "wind": {
//                   "speed": 1.98,
//                   "deg": 147,
//                   "gust": 5.96
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-04 03:00:00"
//           },
//           {
//               "dt": 1662271200,
//               "main": {
//                   "temp": 290.21,
//                   "feels_like": 290.01,
//                   "temp_min": 290.21,
//                   "temp_max": 290.21,
//                   "pressure": 1013,
//                   "sea_level": 1013,
//                   "grnd_level": 1009,
//                   "humidity": 78,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 100
//               },
//               "wind": {
//                   "speed": 2.83,
//                   "deg": 140,
//                   "gust": 8.67
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-04 06:00:00"
//           },
//           {
//               "dt": 1662282000,
//               "main": {
//                   "temp": 293.94,
//                   "feels_like": 293.59,
//                   "temp_min": 293.94,
//                   "temp_max": 293.94,
//                   "pressure": 1014,
//                   "sea_level": 1014,
//                   "grnd_level": 1011,
//                   "humidity": 58,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 100
//               },
//               "wind": {
//                   "speed": 4.41,
//                   "deg": 188,
//                   "gust": 7.24
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-04 09:00:00"
//           },
//           {
//               "dt": 1662292800,
//               "main": {
//                   "temp": 295.84,
//                   "feels_like": 295.52,
//                   "temp_min": 295.84,
//                   "temp_max": 295.84,
//                   "pressure": 1014,
//                   "sea_level": 1014,
//                   "grnd_level": 1011,
//                   "humidity": 52,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 100
//               },
//               "wind": {
//                   "speed": 5.13,
//                   "deg": 189,
//                   "gust": 7.57
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-04 12:00:00"
//           },
//           {
//               "dt": 1662303600,
//               "main": {
//                   "temp": 295.36,
//                   "feels_like": 295.07,
//                   "temp_min": 295.36,
//                   "temp_max": 295.36,
//                   "pressure": 1014,
//                   "sea_level": 1014,
//                   "grnd_level": 1011,
//                   "humidity": 55,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 100
//               },
//               "wind": {
//                   "speed": 4.89,
//                   "deg": 193,
//                   "gust": 7.09
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-04 15:00:00"
//           },
//           {
//               "dt": 1662314400,
//               "main": {
//                   "temp": 294.5,
//                   "feels_like": 294.31,
//                   "temp_min": 294.5,
//                   "temp_max": 294.5,
//                   "pressure": 1015,
//                   "sea_level": 1015,
//                   "grnd_level": 1012,
//                   "humidity": 62,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 100
//               },
//               "wind": {
//                   "speed": 3.25,
//                   "deg": 193,
//                   "gust": 7.65
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-04 18:00:00"
//           },
//           {
//               "dt": 1662325200,
//               "main": {
//                   "temp": 292.37,
//                   "feels_like": 292.28,
//                   "temp_min": 292.37,
//                   "temp_max": 292.37,
//                   "pressure": 1016,
//                   "sea_level": 1016,
//                   "grnd_level": 1013,
//                   "humidity": 74,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 804,
//                       "main": "Clouds",
//                       "description": "overcast clouds",
//                       "icon": "04n"
//                   }
//               ],
//               "clouds": {
//                   "all": 89
//               },
//               "wind": {
//                   "speed": 2.11,
//                   "deg": 195,
//                   "gust": 5.99
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-04 21:00:00"
//           },
//           {
//               "dt": 1662336000,
//               "main": {
//                   "temp": 291.74,
//                   "feels_like": 291.72,
//                   "temp_min": 291.74,
//                   "temp_max": 291.74,
//                   "pressure": 1016,
//                   "sea_level": 1016,
//                   "grnd_level": 1012,
//                   "humidity": 79,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 500,
//                       "main": "Rain",
//                       "description": "light rain",
//                       "icon": "10n"
//                   }
//               ],
//               "clouds": {
//                   "all": 94
//               },
//               "wind": {
//                   "speed": 1.64,
//                   "deg": 174,
//                   "gust": 4.28
//               },
//               "visibility": 10000,
//               "pop": 0.26,
//               "rain": {
//                   "3h": 0.15
//               },
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-05 00:00:00"
//           },
//           {
//               "dt": 1662346800,
//               "main": {
//                   "temp": 290.32,
//                   "feels_like": 290.47,
//                   "temp_min": 290.32,
//                   "temp_max": 290.32,
//                   "pressure": 1015,
//                   "sea_level": 1015,
//                   "grnd_level": 1012,
//                   "humidity": 91,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 501,
//                       "main": "Rain",
//                       "description": "moderate rain",
//                       "icon": "10n"
//                   }
//               ],
//               "clouds": {
//                   "all": 100
//               },
//               "wind": {
//                   "speed": 1.73,
//                   "deg": 237,
//                   "gust": 5.54
//               },
//               "visibility": 10000,
//               "pop": 0.98,
//               "rain": {
//                   "3h": 3.02
//               },
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-05 03:00:00"
//           },
//           {
//               "dt": 1662357600,
//               "main": {
//                   "temp": 289.99,
//                   "feels_like": 290.18,
//                   "temp_min": 289.99,
//                   "temp_max": 289.99,
//                   "pressure": 1015,
//                   "sea_level": 1015,
//                   "grnd_level": 1012,
//                   "humidity": 94,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 501,
//                       "main": "Rain",
//                       "description": "moderate rain",
//                       "icon": "10d"
//                   }
//               ],
//               "clouds": {
//                   "all": 100
//               },
//               "wind": {
//                   "speed": 2.02,
//                   "deg": 87,
//                   "gust": 3.65
//               },
//               "visibility": 10000,
//               "pop": 1,
//               "rain": {
//                   "3h": 9.23
//               },
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-05 06:00:00"
//           },
//           {
//               "dt": 1662368400,
//               "main": {
//                   "temp": 293.14,
//                   "feels_like": 293.15,
//                   "temp_min": 293.14,
//                   "temp_max": 293.14,
//                   "pressure": 1015,
//                   "sea_level": 1015,
//                   "grnd_level": 1012,
//                   "humidity": 75,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 801,
//                       "main": "Clouds",
//                       "description": "few clouds",
//                       "icon": "02d"
//                   }
//               ],
//               "clouds": {
//                   "all": 14
//               },
//               "wind": {
//                   "speed": 2.68,
//                   "deg": 168,
//                   "gust": 4.53
//               },
//               "visibility": 10000,
//               "pop": 0.06,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-05 09:00:00"
//           },
//           {
//               "dt": 1662379200,
//               "main": {
//                   "temp": 296.62,
//                   "feels_like": 296.38,
//                   "temp_min": 296.62,
//                   "temp_max": 296.62,
//                   "pressure": 1014,
//                   "sea_level": 1014,
//                   "grnd_level": 1011,
//                   "humidity": 52,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 801,
//                       "main": "Clouds",
//                       "description": "few clouds",
//                       "icon": "02d"
//                   }
//               ],
//               "clouds": {
//                   "all": 22
//               },
//               "wind": {
//                   "speed": 3.72,
//                   "deg": 194,
//                   "gust": 5.45
//               },
//               "visibility": 10000,
//               "pop": 0.02,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-05 12:00:00"
//           },
//           {
//               "dt": 1662390000,
//               "main": {
//                   "temp": 296.87,
//                   "feels_like": 296.6,
//                   "temp_min": 296.87,
//                   "temp_max": 296.87,
//                   "pressure": 1013,
//                   "sea_level": 1013,
//                   "grnd_level": 1010,
//                   "humidity": 50,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 802,
//                       "main": "Clouds",
//                       "description": "scattered clouds",
//                       "icon": "03d"
//                   }
//               ],
//               "clouds": {
//                   "all": 26
//               },
//               "wind": {
//                   "speed": 4.72,
//                   "deg": 202,
//                   "gust": 6.48
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-05 15:00:00"
//           },
//           {
//               "dt": 1662400800,
//               "main": {
//                   "temp": 294.57,
//                   "feels_like": 294.39,
//                   "temp_min": 294.57,
//                   "temp_max": 294.57,
//                   "pressure": 1013,
//                   "sea_level": 1013,
//                   "grnd_level": 1010,
//                   "humidity": 62,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 801,
//                       "main": "Clouds",
//                       "description": "few clouds",
//                       "icon": "02d"
//                   }
//               ],
//               "clouds": {
//                   "all": 20
//               },
//               "wind": {
//                   "speed": 2.78,
//                   "deg": 188,
//                   "gust": 5.46
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-05 18:00:00"
//           },
//           {
//               "dt": 1662411600,
//               "main": {
//                   "temp": 291.9,
//                   "feels_like": 291.89,
//                   "temp_min": 291.9,
//                   "temp_max": 291.9,
//                   "pressure": 1013,
//                   "sea_level": 1013,
//                   "grnd_level": 1010,
//                   "humidity": 79,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 500,
//                       "main": "Rain",
//                       "description": "light rain",
//                       "icon": "10n"
//                   }
//               ],
//               "clouds": {
//                   "all": 39
//               },
//               "wind": {
//                   "speed": 2.81,
//                   "deg": 164,
//                   "gust": 7.56
//               },
//               "visibility": 10000,
//               "pop": 0.34,
//               "rain": {
//                   "3h": 0.13
//               },
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-05 21:00:00"
//           },
//           {
//               "dt": 1662422400,
//               "main": {
//                   "temp": 291.18,
//                   "feels_like": 291.26,
//                   "temp_min": 291.18,
//                   "temp_max": 291.18,
//                   "pressure": 1012,
//                   "sea_level": 1012,
//                   "grnd_level": 1009,
//                   "humidity": 85,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 803,
//                       "main": "Clouds",
//                       "description": "broken clouds",
//                       "icon": "04n"
//                   }
//               ],
//               "clouds": {
//                   "all": 57
//               },
//               "wind": {
//                   "speed": 3.08,
//                   "deg": 160,
//                   "gust": 9.12
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-06 00:00:00"
//           },
//           {
//               "dt": 1662433200,
//               "main": {
//                   "temp": 290.59,
//                   "feels_like": 290.64,
//                   "temp_min": 290.59,
//                   "temp_max": 290.59,
//                   "pressure": 1011,
//                   "sea_level": 1011,
//                   "grnd_level": 1008,
//                   "humidity": 86,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 500,
//                       "main": "Rain",
//                       "description": "light rain",
//                       "icon": "10n"
//                   }
//               ],
//               "clouds": {
//                   "all": 60
//               },
//               "wind": {
//                   "speed": 3.26,
//                   "deg": 169,
//                   "gust": 9.3
//               },
//               "visibility": 10000,
//               "pop": 0.28,
//               "rain": {
//                   "3h": 0.19
//               },
//               "sys": {
//                   "pod": "n"
//               },
//               "dt_txt": "2022-09-06 03:00:00"
//           },
//           {
//               "dt": 1662444000,
//               "main": {
//                   "temp": 289.69,
//                   "feels_like": 289.67,
//                   "temp_min": 289.69,
//                   "temp_max": 289.69,
//                   "pressure": 1011,
//                   "sea_level": 1011,
//                   "grnd_level": 1008,
//                   "humidity": 87,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 802,
//                       "main": "Clouds",
//                       "description": "scattered clouds",
//                       "icon": "03d"
//                   }
//               ],
//               "clouds": {
//                   "all": 35
//               },
//               "wind": {
//                   "speed": 3.23,
//                   "deg": 166,
//                   "gust": 9.68
//               },
//               "visibility": 10000,
//               "pop": 0.04,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-06 06:00:00"
//           },
//           {
//               "dt": 1662454800,
//               "main": {
//                   "temp": 293.31,
//                   "feels_like": 293.1,
//                   "temp_min": 293.31,
//                   "temp_max": 293.31,
//                   "pressure": 1011,
//                   "sea_level": 1011,
//                   "grnd_level": 1008,
//                   "humidity": 66,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 803,
//                       "main": "Clouds",
//                       "description": "broken clouds",
//                       "icon": "04d"
//                   }
//               ],
//               "clouds": {
//                   "all": 69
//               },
//               "wind": {
//                   "speed": 4.7,
//                   "deg": 178,
//                   "gust": 7.22
//               },
//               "visibility": 10000,
//               "pop": 0,
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-06 09:00:00"
//           },
//           {
//               "dt": 1662465600,
//               "main": {
//                   "temp": 293.29,
//                   "feels_like": 293.24,
//                   "temp_min": 293.29,
//                   "temp_max": 293.29,
//                   "pressure": 1010,
//                   "sea_level": 1010,
//                   "grnd_level": 1007,
//                   "humidity": 72,
//                   "temp_kf": 0
//               },
//               "weather": [
//                   {
//                       "id": 500,
//                       "main": "Rain",
//                       "description": "light rain",
//                       "icon": "10d"
//                   }
//               ],
//               "clouds": {
//                   "all": 85
//               },
//               "wind": {
//                   "speed": 5.15,
//                   "deg": 191,
//                   "gust": 8.28
//               },
//               "visibility": 10000,
//               "pop": 0.42,
//               "rain": {
//                   "3h": 0.56
//               },
//               "sys": {
//                   "pod": "d"
//               },
//               "dt_txt": "2022-09-06 12:00:00"
//           }
//       ],
//       "city": {
//           "id": 2643743,
//           "name": "London",
//           "coord": {
//               "lat": 51.5085,
//               "lon": -0.1257
//           },
//           "country": "GB",
//           "population": 1000000,
//           "timezone": 3600,
//           "sunrise": 1662009181,
//           "sunset": 1662058114
//       }
//   }

const base_url = 'https://api.openweathermap.org/data/2.5/'
const weather_url = base_url + 'weather?q='
const forecast_url = base_url + 'forecast?q='
const api_key = '&APPID=1729a6b082fe1edb7990e2bea663bb38'

document.addEventListener('DOMContentLoaded', () => {
      fetchData('weather', 'London').then(data => {
            renderData(data)
      })

})

async function fetchData(type, city) {
      const url = type === 'weather' ? weather_url : forecast_url
      const response = await fetch(url + city + api_key)
      return await response.json()
}

function renderData(data) {
      let parent = document.querySelector('.display')
      let html = ''
      html =    `
      <div class="card-day">
      <div class="time">Day</div>
      <div class="city">Nairobi</div>
      <div class="desc">Short rains with heavy clouds</div>
      <div class="details">
            <div>
                  <div>Temperature</div>
                  <div>36 C</div>
            </div>
            <div>
                  <div>Humidity</div>
                  <div>36 %</div>
            </div>
            <div>
                  <div>Wind Speed</div>
                  <div>36 km/h</div>
            </div>
      </div>
      <div class="btn">forecast</div>
</div>`

      parent.innerHTML = html
}






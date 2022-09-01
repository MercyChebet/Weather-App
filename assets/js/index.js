const base_url = 'https://api.openweathermap.org/data/2.5/'
const weather_url = base_url + 'weather?q='
const forecast_url = base_url + 'forecast?q='
const api_key = '&APPID=1729a6b082fe1edb7990e2bea663bb38'

document.addEventListener('DOMContentLoaded', () => {
      //get parent element
      let parent = document.querySelector('.display')

      //create child elements
      let card1 = document.createElement('div')
      let card2 = document.createElement('div')
      let card3 = document.createElement('div')

      //add classnames to children
      card1.className = 'card-day'
      card2.className = 'card-day'
      card3.className = 'card-day'
      setLoading(card1)
      setLoading(card2)
      setLoading(card3)

      //append the children to parent elements
      // parent.appendChild(card1)
      // parent.appendChild(card2)
      // parent.appendChild(card3)

      //Form
      let cityField = document.getElementById('city')
      document.getElementById('city').addEventListener('change',(e)=>{
            let city = e.value
            card1.innerHTML = ""
            card2.innerHTML = ""
            card3.innerHTML = ""
            fetchData('weather', city).then(data => {
                  renderData(data, card1)
            })
            fetchData('forecast', city).then(datal => {

                  renderForecast(datal, card2,1)
                  renderForecast(datal, card3,2)


            })


      })
      // fetchData('weather', 'London').then(data => {
      //       renderData(data, card1)
      // })
      // fetchData('forecast', "London").then(datal => {

      //       renderForecast(datal, card2,1)
      //       renderForecast(datal, card3,2)


      // })

})

async function fetchData(type, city) {
      const url = type === 'weather' ? weather_url : forecast_url
      const response = await fetch(url + city + api_key)
      return await response.json()
}

function renderData(data, card) {
      const hours = new Date().getHours()
      const isDayTime = hours > 6 && hours < 20;
      console.log(data)
      let html = ''
      html = `
            <div class="time">${data.name}</div>
            <div class="city">Today</div>
            <div class="desc">${data.weather[0].description}</div>
            <div class="details">
                  <div>
                        <div>Temperature</div>
                        <div>${data.main.temp}</div>
                  </div>
                  <div>
                        <div>Humidity</div>
                        <div>${data.main.humidity}</div>
                  </div>
                  <div>
                        <div>Wind Speed</div>
                        <div>${data.wind.speed} km/h</div>
                  </div>
            </div>
      `;
      removeLoading(card)
      card.innerHTML = html

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

function renderForecast(data, card,day) {
      let d = day === 1 ? 'Tommorrow' : 'Next Day'
      let ind = day === 1 ? 8 : 16
      html = `
            <div class="time">${data.city.name}</div>
            <div class="city">${d}</div>
            <div class="desc">${ data.list[ind].weather[0].description}</div>
            <div class="details">
                  <div>
                        <div>Temperature</div>
                        <div>${data.list[ind].main.temp}</div>
                  </div>
                  <div>
                        <div>Humidity</div>
                        <div>${data.list[ind].main.humidity}</div>
                  </div>
                  <div>
                        <div>Wind Speed</div>
                        <div>${data.list[ind].wind.speed}</div>
                  </div>
            </div>
      `;
      card.innerHTML = html
}

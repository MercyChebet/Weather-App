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
      console.log(data)
      let html = ''
      html = `
            <div class="time">Today</div>
            <div class="city">${data.name}</div>
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

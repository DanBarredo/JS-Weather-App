import WEATHER_API_KEY from "./config.js"

const form = document.querySelector(".search-form")
const msg = document.querySelector(".msg")

function weatherApp (city, country) {
    const apiKey = WEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
    fetch(url)
    .then((response) => {
        return response.json() 
    })
    .then((data) => {
        console.log(data)
        if (data.cod == 404) {
            msg.classList.add("not-found")
            msg.textContent = "Please enter a valid location..."
            setTimeout(() => {
                msg.classList.remove("not-found")
                msg.textContent = ""
            }, 2500)
        }
        else {
            msg.classList.add("show-found")
            msg.textContent = "Here's what the weather is like..."
            drawWeather(data)
        }
    })
    .catch(() => {
    })
}

function drawWeather (data) {
    const celsius = Math.round(parseFloat(data.main.temp))
    const description = data.weather[0].description
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
    data.weather[0]["icon"]}.svg`

    document.getElementById('description').innerHTML = description
    document.getElementById('temp').innerHTML = celsius + '&deg;'
    document.getElementById('location').innerHTML = data.name
    document.getElementById('icon').src = icon

    if( description.indexOf('cloud') > 0 ) {
          document.body.className = 'cloudy';
    } 
    else if(description.indexOf('mist') > 0 ) {
  	    document.body.className = 'mist';
    } 
    else if(description.indexOf('rain') > 0 ) {
  	    document.body.className = 'rainy';
    } 
    else if( description.indexOf('snow') > 0 ) {
        document.body.className = 'snowy';
    } 
    else if( description.indexOf('sunny') > 0 ) {
          document.body.className = 'sunny';
          document.body.innerHTML += '<div class="sun"></div>'
    }
    else {
          document.body.className = 'clear';
    }
}

form.addEventListener("submit",  e=> {
    e.preventDefault()
    var city = document.querySelector(".search-city").value
    var country = document.querySelector(".search-country").value
    weatherApp(city, country)
})

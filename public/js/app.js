const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const forecastResult = document.querySelector("#forecast-result")
const weatherIcon = document.querySelector("#weather-icon")

forecastResult.textContent = ''
weatherIcon.src= '';
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    fetch(`/weather?location=${searchElement.value}`).then((response)=>{
        
        response.json().then((data)=>{
            if (data.error){
                forecastResult.textContent = `Error - ${data.error}`
            }else{
                forecastResult.textContent = `Forecast in ${data.location} is ${data.forecast}`
                if (data.weatherIcon) weatherIcon.src= data.weatherIcon;
            }
        })
    })
})
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const forecastResult = document.querySelector("#forecast-result")

forecastResult.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    fetch(`/weather?location=${searchElement.value}`).then((response)=>{
        
        response.json().then((data)=>{
            forecastResult.textContent = data.error ? `Error - ${data.error}` : `Forecast in ${data.location} is ${data.forecast}.`
        })
    })
})
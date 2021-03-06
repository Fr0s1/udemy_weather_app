const weatherForm = document.querySelector('form')
const search = document.querySelector('form > input')
const locationName = document.querySelector('#location')
const weatherInfo = document.querySelector('#data')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationName.textContent = data.error;
            } else {
                locationName.textContent = data.location;
                weatherInfo.textContent = data.forecastData;
            }
        })
    })
})


const $toggleButtons = document.querySelectorAll('[data-sidebar-toggler]');
const $sidebar = document.querySelector("[data-sidebar]");
const $overlay = document.querySelector(".overlay");

const toggleActive = () =>{
    $sidebar.classList.toggle("active");
    $overlay.classList.toggle("active")
}
$toggleButtons.forEach(elem=> 
    elem.addEventListener("click", toggleActive))




// initialize value where it holds the name of the city.
let cityValue = "kathmandu";

const api_key = "f5b970e73fbed8b787fa4b5b95f576d2";

const formSubmit = document.querySelector(".formSubmit")
const submitButton = document.querySelector(".submitButton");
const weatherDetails = document.querySelector(".weatherDetails");

//adding a loader on the app

// const loader = document.querySelector("#loading");
// console.log(loader)


// const showLoader = () => {
//         loader.style.display = "block";
       
// }

// const hideLoader = () => {
//     loader.style.display = "none";
// }



const city = document.querySelector("#cityName");
city.addEventListener("input", (event) => {
    cityValue = event.target.value
})


formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    toggleActive();
    if (cityValue) {
        weatherDetails.style.color = "unset";
        getData()
    }
    else {
        weatherDetails.innerHTML = "Please select a state or a city";
        weatherDetails.style.color = "red";
    }
})

async function getData() {
    console.log(cityValue);
    // showLoader();
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${api_key}&units=imperial`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`)
        }
        const weatherData = await response.json();
        const $cityName = document.querySelector("[data-city-name]");
        $cityName.innerHTML = `Dashboard: ${cityValue} `;
        const fiveDayForecast = weatherData.list;

        fiveDayForecast.forEach((list)=> {
            console.log(list);
            const forecastDateandTime  = list.dt_txt;
            const forecastDate = forecastDateandTime.split(" ")[0]
            const forecastTIme = forecastDateandTime.split(" ")[1]
            const temperature = list.main.temp;
            const icon =  list.weather[0].icon
            console.log(forecastDate );
            weatherDetails.innerHTML += ` 
            <div class = "weather-item container">
            <p class = ""> Date: ${forecastDate } </p>
            <p class = ""> Time: ${forecastTIme } </p>
            <p class = ""> Temperature: ${temperature} C </p>
            <p class = ""> Description: ${list.weather[0].description}</p>
            <img src = "https://openweathermap.org/img/wn/${icon}@2x.png"/>
           
            `
        })
        console.log(typeof weatherData);
        // hideLoader();
       
        cityValue = ""
        city.value = ""
    }
    // catch (error) {
    //     weatherDetails.innerHTML = "Cannot find the city"
    //     console.log(error)
    // }
    finally {
        // hideLoader();
    }
}

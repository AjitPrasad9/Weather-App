const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Set styles for cursorDot
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Use CSS keyframes for cursorOutline animation
    const keyframes = [
        { left: `${posX}px`, top: `${posY}px` }
    ];

    cursorOutline.animate(keyframes, { duration: 500, fill: "forwards" });
});



let search = document.querySelector(".searchButton");
const conditionImageMap = {
    "Partly Cloudy": "weather-app-img/images/mist.png",
    "Haze": "weather-app-img/images/haze.webp",
    "Mostly Sunny": "weather-app-img/images/clear.png",
    "Sunny": "weather-app-img/images/clear.png",
    "Rain": "weather-app-img/images/rain.png",
    "Snow": "weather-app-img/images/snow.png",
    "Cloudy": "weather-app-img/images/clouds.png",
    "Mostly Cloudy": "weather-app-img/images/clouds.png"
};


search.addEventListener("click", () => {
    let city = document.querySelector("#cityName");
    console.log(city.value);
    fetchData(city.value); // Call fetchData with the city value entered by the user
});

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '950971baf9mshe9031faf91e466bp15fb3ajsn5f86cdf55777',
        'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
};

async function fetchData(cityName) {
    try {
        const response = await fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${cityName}&format=json&u=f`, options);
        const result = await response.json();
        console.log(result);
        document.querySelector(".city").innerText = result.location.city;
        const temperature = changeToDegree(result.current_observation.condition.temperature);
        document.querySelector(".temp").innerText = temperature + "°C";
        const currentCondition = result.current_observation.condition.text;
        document.querySelector(".text").innerText = result.current_observation.condition.text;
        updateWeather(currentCondition);
        for (let i = 0; i < 7; i++) {
            document.querySelector(`.day${i + 1}`).innerText = result.forecasts[i].day;
            const imgUrl = document.querySelector(`.icon${i + 1}`);
            if (result.forecasts[i].text in conditionImageMap) {
                imgUrl.src = conditionImageMap[result.forecasts[i].text];
            } else {
                imgUrl.src = conditionImageMap["Sunny"];
            }

            document.querySelector(`.t${i + 1}`).innerText = changeToDegree(result.forecasts[i].high) + "°C/" + changeToDegree(result.forecasts[i].low) + "°C";
        }
        const timestamp = result.current_observation.pubDate;
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const formattedDate = date.toDateString(); // Get the date portion as a string
        document.querySelector(".day").innerText = formattedDate;
        console.log(formattedDate);

        document.querySelector(".pressure").innerText = result.current_observation.atmosphere.pressure;
        document.querySelector(".humidity").innerText = result.current_observation.atmosphere.humidity + "%";
        document.querySelector(".visibility").innerText = result.current_observation.atmosphere.visibility;
        document.querySelector(".sunrise").innerText = result.current_observation.astronomy.sunrise;
        document.querySelector(".sunset").innerText = result.current_observation.astronomy.sunset;
        document.querySelector(".wind-speed").innerText = result.current_observation.wind.speed;
        document.querySelector(".direction").innerText = result.current_observation.wind.direction;


    } catch (error) {
        alert("Something went wrong");
        console.error(error);
    }
}
function updateWeather(condition) {
    const image = document.querySelector(".weatherImage");

    if (condition in conditionImageMap) {
        image.src = conditionImageMap[condition];
    }
    else {
        image.src = "weather-app-img/images/clear.png";
    }
}
function changeToDegree(temp) {
    return Math.round((temp - 32) / 1.8);
}

//dark mode light mode #050a305d #0e155035
let check = true;
const btn = document.querySelector(".mode");
btn.addEventListener("click", () => {
    if (check) {
        const allElements = document.querySelectorAll("*");
        allElements.forEach(element => {
            element.style.color = "white";
        });
        document.querySelector("body").style.backgroundColor = "black";
        document.querySelector(".left-part").style.backgroundColor = "#050a302d";
        const div1 = document.querySelectorAll(".days div");
        const div2 = document.querySelectorAll(".highlights div");
        div1.forEach(div => {
            div.style.backgroundColor = "#050a302d";
        });
        div2.forEach(div => {
            div.style.backgroundColor = "#050a302d";
        });
        document.querySelector(".right-part").style.backgroundColor = "#0e155015";
        btn.innerText = "Light Mode";
        btn.style.backgroundColor = "#ffffff40";
        btn.style.color = "black";
        document.querySelector(".searchButton").style.color = "black";
        document.querySelector("input").style.color = "black";
    } else {
        const allElements = document.querySelectorAll("*");
        allElements.forEach(element => {
            element.style.color = "black";
        });
        document.querySelector("body").style.backgroundColor = "#ffffff40";
        document.querySelector(".left-part").style.backgroundColor = "#ffffff40";
        const div1 = document.querySelectorAll(".days div");
        const div2 = document.querySelectorAll(".highlights div");
        div1.forEach(div => {
            div.style.backgroundColor = "#ffffff40";
        });
        div2.forEach(div => {
            div.style.backgroundColor = "#ffffff40";
        });
        document.querySelector(".right-part").style.backgroundColor = "#ffffff40";
        btn.innerText = "Dark Mode";
        btn.style.backgroundColor = "#050a302d";
        btn.style.color = "#ffffff40";
    }
    check = !check;
});


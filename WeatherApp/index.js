function getParish(){
    const e = document.getElementById("parish");
    const location = e.options[e.selectedIndex].value;
    localStorage.setItem("location", location);
    window.location = "weatherpage.html";
}

function loadPage(){
    const location = localStorage.getItem("location");
    const currentDay = document.getElementById("current-day");
    const currentWeather = document.getElementById("current-weather");
    const weatherDesc = document.getElementById("weather-description");
    const dailyWeather = document.getElementById("daily-weather-info");

    var latitude, longitude;

    if(location==="Kingston"){
        latitude = "17.970473949925978"
        longitude = "-76.77963894762368"
    }
    else if(location === "Portland"){
        latitude = "18.141876432845624"
        longitude = "-76.58169372894798"
    }

    const apiKey = "a59944a7dfac4d02e97986183343ea57"

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${apiKey}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { current, daily} = data;
            console.log(daily)
            const today = new Date();
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
            const date = `
                <h1 id="temp">Today, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}</h1>
            `
            const icon = `http://openweathermap.org/img/wn/${(current["weather"])[0]["icon"]}@2x.png`
            const iconDescription = (current["weather"])[0]["description"]
            const weather = `
                <h1>${Math.round(current["temp"])}</h1>
                <p>&deg</p>
                <img src="${icon}" alt=${iconDescription}>
            `
            const description = `
                <p>${iconDescription.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())} | ${location}</p>
            `
            currentDay .innerHTML = date;
            currentWeather.innerHTML = weather;
            weatherDesc.innerHTML = description;
            
            var day = today.getDay();
            const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
            for(var i = 0; i < 4; i++){
                const li = document.createElement("li");
                li.classList.add("weather")

                day = day < 7 ? day + 1 : 0;
                const weatherIcon = `http://openweathermap.org/img/wn/${((daily[i])["weather"])[0]["icon"]}@2x.png`
                const dailyInfo = `
                    <img src=${weatherIcon} alt="weather">
                    <p>${((daily[i])["weather"])[0]["description"].replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
                    <p><strong>${days[day]}</strong></p>
                `
                li.innerHTML = dailyInfo;
                dailyWeather.appendChild(li);

            }

        })
}
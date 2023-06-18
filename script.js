let weather = {
    apikey : {"key": "c85abb81097c19745baf8a863f618405"},
    
    fetchWeather : function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apikey.key)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data))
        .catch((error) => console.error("Error fetching weather:", error));
    },
    
    displayWeather : function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        
    },

    search : function() {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};



document.querySelector("button svg").parentNode.addEventListener("click", function() {
    weather.search();
});

document.querySelector(".location-btn").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            let city;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weather.apikey.key}`)
                .then(response => response.json())
                .then(data => {
                    city = data.name;
                    weather.fetchWeather(city);
                })
                .catch(error => console.log(error));
            });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
   

document.querySelector(".searchbar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("mumbai");

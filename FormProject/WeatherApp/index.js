const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const weatherIcon = document.querySelector(".weatherIcon");


const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "c5d1649f67819237f3f71d011c8ff47d";

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == "404") {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".data").style.display = "none"
    }else{
    var data = await response.json();
    // console.log(data);
 
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " Km/h";
    document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%";
    document.querySelector(".description").innerHTML = data.weather[0].description;


    // function timeFormate(timestamp){
    //     const date = new Date(timestamp * 1000);
    //     let hours = date.getHours();
    //     let minutes = date.getMinutes().toString().padStart(2, '0');
    //     const seconds = date.getSeconds().toString().padStart(2, '0');
    //     const ampm =  hours >= 12 ? 'PM':'AM';

    //     hours = hours % 12;
    //     hours = hours ? hours : 12;
        
    //     return `${hours}:${minutes}:${seconds} ${ampm}`
    // }

    // if (data.sys) {
    //     document.querySelector(".time1").innerHTML = timeFormate(data.sys.sunrise);
    //     document.querySelector(".time2").innerHTML = timeFormate(data.sys.sunset)
    // }else{
    //     // console.log("Something went wrong...");
        
    // }



            function timeFormate(timestamp){
                const date = new Date(timestamp *1000);
                let hours = date.getHours();
                let minutes = date.getMinutes().toString().padStart(2, "0");
                let seconds = date.getSeconds().toString().padStart(2, "0");
                let ampm = hours>=12?"PM":"AM";
            
                hours = hours % 12;
                hours = hours ? hours:12;
                return `${hours}:${minutes}:${seconds}${ampm}`;
            }
            if (data.sys) {
                document.querySelector(".time1").innerHTML = timeFormate(data.sys.sunrise);
                document.querySelector(".time2").innerHTML = timeFormate(data.sys.sunset);
            }else{
                console.log("Something went wrong");
                
            }


    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/cloud.png"
    }else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear-sky.png";
    }else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/heavy-rain.png";
    }else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/cloudy.png";
    }else if (data.weather[0].main == "Mist") {
        weather.src = "images/cloudy.png"
    }else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png"
    }

    document.querySelector(".data").style.display = "block";
    document.querySelector(".error").style.display = "none";
    
}
    
}

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const search = searchBox.value.trim();
    if(!search){
        document.querySelector(".city").innerHTML = "<p>SearchBox is empty </p>";
    }else{
        checkWeather(search);
        searchBox.value = "";
    }
 


});


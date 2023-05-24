const apiKey="b9c9298852aca80fef1bd78ce9285257";
const weatherData=document.getElementById("Weather-data");
const cityInputEl=document.getElementById("cityInput");
const formEl=document.querySelector("form");


formEl.addEventListener("submit",(event)=>{
   event.preventDefault();
   const cityValue = cityInputEl.value;
   getWeatherData(cityValue);

});


async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&q=${cityValue}&appid=${apiKey}&units=metric`)

        if(!response.ok)
        {
            throw new Error("network response was not Ok");
        }
        const data=await response.json();
      
        const temperature=Math.round(data.main.temp);
        const description=data.weather[0].description;
        const icon=data.weather[0].icon;
        const details=[
            `Feels like:${Math.round(data.main.feels_like)}°C`,
            `Humidity:${data.main.humidity}%`,
            `Wind speed:${data.wind.speed} m/s`,
        ]

        weatherData.querySelector(".icon").innerHTML=` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`

        weatherData.querySelector(".temperature").textContent=`${temperature}°C`

        weatherData.querySelector(".description").textContent=description;

        weatherData.querySelector(".details").innerHTML=details.map((detail)=> `<div>${detail}</div>`

        ).join("");

    } catch (error) {
        weatherData.querySelector(".icon").innerHTML="";

        weatherData.querySelector(".temperature").textContent="";

        weatherData.querySelector(".description").textContent="An error happend please try again";

        weatherData.querySelector(".details").innerHTML="";
    }
}
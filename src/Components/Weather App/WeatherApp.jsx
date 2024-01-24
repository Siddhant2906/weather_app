import React, { useState } from 'react'
import './WeatherApp.css'

import clear from '../Assets/clear.png'
import cloud from '../Assets/cloud.png'
import drizzle from '../Assets/drizzle.png'
import humidity from '../Assets/humidity.png'
import rain from '../Assets/humidity.png'
import search_icon from '../Assets/search.png'
import snow from '../Assets/snow.png'
import wind from '../Assets/wind.png'

export const WeatherApp = () => {
    let api_key = "f09d77b81af2c6514c79ac9196bdff21";

    const [wicon,setWicon] = useState(cloud)


    const search = async () =>{
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value===0){
            return 0;
        }



        try{
           
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&lat=44.34&lon=10.99&units=Metric&appid=${api_key}`

       
        

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        let data = await response.json();

        

        const humidity = document.getElementsByClassName("humidity-percent")
        const wind = document.getElementsByClassName("wind-speed")
        const temperature = document.getElementsByClassName("weather-temp")
        const location = document.getElementsByClassName("weather-location")

        humidity[0].innerHTML = data.main.humidity+"%"
        wind[0].innerHTML = Math.floor(data.wind.speed) + "km/hr"
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°C"
        location[0].innerHTML = data.name

        if(data.weather[0].icon==="01d" ||  data.weather[0].icon==="01n" ){
                 setWicon(clear)
        }
        
        else if(data.weather[0].icon==="02d" ||  data.weather[0].icon==="02n" ){
                 setWicon(cloud)
        }
        else if(data.weather[0].icon==="03d" ||  data.weather[0].icon==="03n" ){
            setWicon(drizzle)
        }
        else if(data.weather[0].icon==="04d" ||  data.weather[0].icon==="04n" ){
            setWicon(drizzle)
        }
        else if(data.weather[0].icon==="09d" ||  data.weather[0].icon==="09n" ){
            setWicon(rain)
        }
        else if(data.weather[0].icon==="10d" ||  data.weather[0].icon==="10n" ){
            setWicon(rain)
        }

        else if(data.weather[0].icon==="13d" ||  data.weather[0].icon==="13n" ){
            setWicon(snow)
        }
        else{
            setWicon(clear)
        }
    }catch (error) {
        console.error("An error occurred:", error.message);
        // Handle the error, e.g., show an error message to the user
    }

       


    }
  return (
    <div className="container">
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='Enter the name of the city'/>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-location">London</div>
        
        <div className="data-container">
            <div className="element">
                <img src={humidity} alt="" classname="icon"/>
                <div className="data">
                    <div className="humidity-percent">
                        64%
                    </div>
                    <div className="text">
                        Humidity
                    </div>
                </div>
            </div>

            <div className="element">
                <img src={wind} alt="" classname="icon"/>
                <div className="data">
                    <div className="wind-speed">
                        20km/hr
                    </div>
                    <div className="text">
                        Wind Speed
                    </div>
                </div>
            </div>
           
        </div>
    </div>
  )
}

import React,{useState } from 'react' 
import { IoLocationSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaWater } from "react-icons/fa6";
import { LuWind } from "react-icons/lu";
import clear_sky from "./images/clearSky.png";
import few_clouds from "./images/fewClouds.png"
import scattered_clouds from './images/scatteredClouds.png'
import broken_Clouds from './images/brokenClouds.png';
import shower_rain from './images/showerRain.png'
import rain from './images/rain.png'
import thunder_storm from './images/thunder.png'
import snow from './images/snow.png'
import mist from './images/mist.png'
import clear_sky01n from "./images/clearSky01n.png";
import few_clouds02n from "./images/fewClouds02n.png"
import scattered_clouds03n from './images/scatteredClouds03n.png'
import broken_Clouds04n from './images/brokenClouds04n.png';
import shower_rain09n from './images/showerRain09n.png'
import rain10n from './images/rain10n.png'
import thunder_storm11n from './images/thunder11n.png'
import snow13n from './images/snow13n.png'
import mist50n from './images/mist50n.png'

import './App.css';

const getIcon = {
  "01d": clear_sky,
  "02d":few_clouds,
  "03d":scattered_clouds,
  "04d":broken_Clouds,
  "09d":shower_rain,
  "10d":rain,
  "11d":thunder_storm,
  "13d":snow,
  "50d":mist,
  "01n":clear_sky01n,
  "02n":few_clouds02n,
  "03n":scattered_clouds03n,
  "04n":broken_Clouds04n,
  "09n":shower_rain09n,
  "10n":rain10n,
  "11n":thunder_storm11n,
  "13n":snow13n,
  "50n":mist50n

} 

function App() {
  const [country, setCountry] = useState("Tiruppur");
  const [weather, setWeather] = useState(false)
  const [isNotFound, setNotFound] = useState(false);
  const [isFirstRun, setFirst] = useState(true);

  const api = {
    base:"https://api.openweathermap.org/data/2.5/",
    key:"c84854eca53151292dd4ac9566f61e58"
  }
  
  const getWeather= async() => {
    try{
      const response = await fetch(`${api.base}weather?q=${country}&units=metric&APPID=${api.key}`)
      const data = await response.json()
      setWeather({
        humidity:data.main.humidity,
        winSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon : getIcon[data.weather[0].icon],
        description:data.weather[0].description
      })
      setNotFound(false)
      console.log(data)
    }
    catch(e){
      console.log('error');
      setNotFound(true)
    }  
  }
  
  if (isFirstRun){
    setFirst(false)
    getWeather() 
  }

  const weatherDetailsPage=()=>(
    <div className='weather-details'>
            <div className='weather-image-container'>
               <img src={weather.icon} alt="weather" className='weather-image'/>
            </div>
            
            <p style={{fontSize:"20px", textTransform:'capitalize'}}>{weather.description}</p>
            <p className='temprature'>{weather.temperature}°c</p>
            <p className='location'>{weather.location}</p>
            <div className='wind-humidity-container' >
              <div style={{display:'flex',flexDirection:'row'}}>
                <FaWater className='icons'/>
                <div style={{display:'flex',flexDirection:'column', marginLeft:'10px'}}>
                  <span className='humidity'>{weather.humidity}%</span>
                  <span>Humidity</span>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'row'}}>
                <LuWind className='icons'/>
                <div style={{display:'flex',flexDirection:'column', marginLeft:'10px'}}>
                  <span className='humidity'>{weather.winSpeed}%</span>
                  <span>wind speed</span>
                </div>
              </div>
            </div>
          </div>
  )

  const notFoundPage = () => (
    <div className='notFound-container'>
       <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg" alt="" className='error-image'/>
    </div>
  )
  

  
  return (
    <div className="weather-app-container">
      <div className="weather-app-card light-color">
      
          <div className="search-bar">
              <div style={{display:"flex",flexDirection:"row"}}>
                  <IoLocationSharp className="icons"/>
                  <input type="text" placeholder="Enter your Location" className="search-input light-color" onChange= {e=>setCountry(e.target.value)}/>
                </div>
                <div className="search-icon" onClick={getWeather}>
                  <FaSearch style={{fontSize:"20"}} />
                </div>
          </div>
          {isNotFound? notFoundPage():weatherDetailsPage()}
      </div>
    </div>
  );
}

export default App;

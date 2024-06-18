import React, { useState } from 'react'
import "./Search.css"
import { useEffect,useRef } from 'react';
import { useContext } from 'react';
import { context } from '../App';
import { Link } from 'react-router-dom';
export default function Search() {
   let {cityname,setcityname,todayweather,
    settodayweather,key,
    dailyweather,
    setdailyweather} = useContext(context)
   let [search,setsearch] = useState("")
   console.log(cityname)

    // const key = "9f5947d25c12a41faf47e95024e4f3fc";
    //  let city = "vijayawada"
     let fetchdata = async ()=>{
      console.log("api called");
        try{
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}`)
            let data = await res.json() 
            console.log(data)
            settodayweather(data)

            const {lat,lon}=data.coord 
            console.log(lat,lon)
            const weeklyWeather=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`)
            const weeklyWeatherData=await weeklyWeather.json()
            console.log(weeklyWeatherData)
            setdailyweather(weeklyWeatherData.list.filter((cur,index)=>index%8==0)) 
            console.log(dailyweather)
             }
        catch(err){
           console.log(err,"err")
        }
     }
useEffect(()=>{
      
       if(cityname!==""){
        fetchdata()
       }
     
    },[search]) 
    
  return (
    <div className="search">
     <input type="text" placeholder='Enter city name' value={cityname}  onChange={(e) => {
                setcityname(e.target.value);
              }}/> 
              <button onClick={(e)=>{
                setsearch(cityname)
              }}>search</button>
              <Link to="/favourites"><button>Favorites</button></Link>
             
    </div>
  )
}

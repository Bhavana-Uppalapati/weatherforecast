import React, { useState } from 'react'
import "./Search.css"
import { useEffect,useRef } from 'react';
import { useContext } from 'react';
import { context } from '../App';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Search() {
   let {cityname,setcityname,todayweather,
    settodayweather,key,
    dailyweather,setfavouriteCities,favouriteCitiesdata,
    setdailyweather} = useContext(context)
   let [search,setsearch] = useState("")

   console.log(cityname)
  let fetchdata = async ()=>{
      console.log("api called");
        try{
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}`)
            let data = await res.json() 
            if(data.cod!==200 ){
              // toast("Enter valid city name")
              alert("Enter valid city name") 
            }
            console.log(data)
            settodayweather(data)
            console.log(todayweather)
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

    const addToFavorites = async () => {
      try {
        const cityExists = favouriteCitiesdata.some(city => city.city.toLowerCase() === cityname.toLowerCase());
        
        if (cityExists) {
          alert("City is already in favorites");
          return;
        }
        else if(cityname==""){
          alert("Enter city name");
          return;
        }
  
        const res = await fetch(`https://food-noq0.onrender.com/weather/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city: cityname }),
        });
  
  
        if (!res.ok) throw new Error('Failed to add city to favorites');
        const data = await res.json();
        setfavouriteCities((prev) => [...prev, data]);
        alert("city added to favourites")
      } catch (error) {
        console.error('Error adding city to favorites:', error);
      }
    };
  
    return (
    <>
    <h1 className="text-white mt-5"style={{textAlign:"center"
    }}>Weather Dashboard </h1> 
      <div className="search">
     <input type="text" placeholder='Enter city name' value={cityname}  onChange={(e) => {
                setcityname(e.target.value);
              }}/> 
              <button onClick={(e)=>{
                setsearch(cityname)
                if(cityname==""){
                  alert("city name can not be empty") 
                }
                
               }}>search</button>
              <Link to="/favourites"><button>Favorites</button></Link>
              <button onClick={addToFavorites}>Add to favourite</button> 
             
    </div> 
    </> 
  
  )
}

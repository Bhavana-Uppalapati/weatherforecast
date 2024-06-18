import React from 'react'
import "./Dashboard.css"
import { useContext } from 'react'
import { context } from '../App'
import cloud3 from "../Assests/weather-icon-png-2.png";


export default function Dashboard() {
  const {date,List,todayweather} =useContext(context)
  console.log(List)
  let temparature = todayweather?.main?.temp
  return (
    todayweather.cod==200 ? 
    <div className='maindiv'>
        <div>
          <p className='fs-4'>{todayweather.name}</p> 
          <p style={{fontSize:"2rem"}}>Today's Weather</p>
          <p style={{fontSize:"1.5rem"}}>{Math.floor(temparature-273)}<sup>o</sup>C</p> 
          <p>{todayweather?.weather[0]?.description[0].toUpperCase()+todayweather?.weather[0]?.description.slice(1)}</p>

        </div>
       <div>
     <img src={cloud3} alt="" /> 
       </div>
     </div> : "" 

  ) 
}

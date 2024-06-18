import React, { useContext, useState } from 'react'
import "./Weatherdisplay.css"
import { context } from '../App'

export default function Weatherdisplay() {
  let {dailyweather} = useContext(context)
  console.log(dailyweather)
  
    // console.log(dailyweather[0]?.dt_txt.slice(0,10))
    // console.log(dailyweather[0]?.main?.temp-273)
  return (
    
   <div>
   
      {dailyweather.length>1?
           dailyweather.map((weather)=>{
                  
                   return (
                   <div>
                         <div  className='weatherdisplay'>
                          <p style={{fontSize:"1.5rem",width:"30%"}}>{new Date(weather?.dt_txt).toDateString()}</p>
                          <p style={{fontSize:"1.5rem",width:"30%"}}>{Math.floor(weather?.main?.temp-273)}<sup>0</sup>C</p>
                          <p style={{fontSize:"1.5rem",width:"30%"}}>{weather?.weather[0]?.description}</p>
                         </div>
                         <hr style={{width:"80vw"}}/>
                   </div>)
          }):""
    }

    </div>

  )
}

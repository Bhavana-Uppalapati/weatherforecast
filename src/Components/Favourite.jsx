import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import "./Favourite.css";
import {  useNavigate } from "react-router-dom";

function Favourite() {
  let date = new Date().toString();
  const [favcityWeather, setfavcityWeather] = useState([]);
  const { favouriteCitiesdata, key, setfavouriteCities } =
    useContext(context);
  const [showUpdate, setShowUpdate] = useState(false);
  const [cityId, setCityId] = useState(null);
  const [newCityName, setNewCityName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    FavouritecityData();
  }, []);

  useEffect(() => {
    if (favouriteCitiesdata.length > 0) {
      WeatherData();
    }
  }, [favouriteCitiesdata]);

  const FavouritecityData = async () => {
    try {
      let res = await fetch(
        "https://food-noq0.onrender.com/weather"
      );
      let data = await res.json();
      setfavouriteCities(data);
      console.log(data);
    } catch (error) {
      console.error("Fetching the data:", error);
    } 
  };

  const WeatherData = async () => {
    try {
      const weatherDataPromises = favouriteCitiesdata.map((cityobj) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityobj.city}&appid=${key}`
        ).then((res) => res.json())
      );
      const weatherData = await Promise.all(weatherDataPromises);
      setfavcityWeather(
        weatherData.map((city, index) => ({
          ...city,
          id: favouriteCitiesdata[index].id,
        }))
      );
      console.log(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const deleteCity = (id) => {
    fetch("https://food-noq0.onrender.com/weather/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setfavcityWeather((prev) => prev.filter((obj) => obj.id !== id));
        setfavouriteCities((prev) => prev.filter((obj) => obj.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting favorite city:", error); 
      });
  };

  const updateCity = (id) => {
    setCityId(id);
    setShowUpdate(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${newCityName}&appid=${key}`
      );
      if (res.ok) {
        const updatedCity = { city: newCityName };
        let updateRes = await fetch(
          `https://food-noq0.onrender.com/weather/${cityId}`, 
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCity),
          }
        );
        let updatedData = await updateRes.json();
        setfavouriteCities((prev) =>
          prev.map((city) => (city.id === cityId ? updatedData : city))  
        );
        setShowUpdate(false);
        setNewCityName("");
        setErrorMessage("");
      } else {
        setErrorMessage("Please enter a valid city name.");
      }
    } catch (error) {
      console.error("Error updating city name:", error);
    }
  };

 const navigateback = () =>{
    navigate("/")
 }
  return (
    <>
    <div style={{marginLeft:"15px"}} className="mt-5"> <button onClick={navigateback} style={{fontSize:"25px"}}><i class="fa-solid fa-arrow-left"></i></button> </div>
    
   
  <div className="favourite-city-div">
  <h1 className="text-white mt-5" style={{ textAlign: "center", marginBottom: "100px" }}>
    Favourite Cities Weather Details
  </h1>
      { favcityWeather.length!==0 ? favcityWeather.map((data, index) => (
        <div key={index} className="fav-weather  mb-5">
          <h3 className="text-white" >{data.name}</h3>
          <p  className="text-white">{date.slice(0, 10)}</p>
          <h3 className="text-white" > 
            {Math.floor(data?.main?.temp - 273)} 
            <sup>o</sup>C
          </h3>
        <button className=" text-white fs-4 border-0" onClick={() => updateCity(data.id)}>Update</button>
        <button class="text-white border-0" onClick={() => deleteCity(data.id)}><i style={{fontSize:"23px"}} class="fa-solid fa-trash"></i></button>
         
        </div>  
      )) : <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>  } 

      {showUpdate && (
        <div className="update-popup-div" style={{marginTop:"100px"}}> 
          <div className="update-popup-content" style={{textAlign:"center"}}>
            <h3>Update City Name</h3> 
            <input className="cityupdateinput"
              type="text"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              placeholder="Enter new city name"
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button onClick={handleUpdateSubmit} disabled={!newCityName}>
              Update
            </button>
            <button onClick={() => setShowUpdate(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div> </>
  ); 
} 


export default Favourite;
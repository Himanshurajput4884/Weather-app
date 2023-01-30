import React, { useState } from 'react'
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
  } from "react-leaflet";


export default function MapEvents() {
    const [activeCity, setactiveCity] = useState(false);
    const [lat, setLat] = useState("");
    const [lon, setlon] = useState("");
    const [data, setData] = useState(null);
    const API_KEY = "0835524e9286c4de06a03df77d17bd17";
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setlon(e.latlng.lng);
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            setData(res);
            setactiveCity(true);
          })
          .catch((err) => {
            console.log("error in get data", err);
            setData(null);
          });
      },
    });
    
    if(data !== null && data.length !== 2){
        return (
            <div> 
              {activeCity  && (
                <Popup position={[lat, lon]} onClose={() => {
                    setactiveCity(null);
                }}>
                  <div>
                    <h2>{data.name}</h2>
                    <p>Minimum Temp : {data.main.temp_min}</p>
                    <p>Maximum Temp : {data.main.temp_max}</p>
                  </div>
                </Popup>
              )}
            </div>
          );
    }
    else{
        return false;
    }
}

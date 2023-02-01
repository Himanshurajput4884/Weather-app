import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import "./Basicmap.css";
import citiesData from "./cities.json";
import MapEvents from "./MapEvents";

export default function BasicMap() {
  const [activeCity, setactiveCity] = useState(null);
  const [ state, setState ] = useState(null)
  return (
    <div className="row">
      <div className="col text-center">
        <p></p>
        <div className="col">
          <MapContainer
            center={[28.6667, 77.2167]}
            zoom={7}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {citiesData.map((v, i) => (
              <Marker key={v.name} position={[v.lat, v.lon]}   eventHandlers={{
                click: (e) => {
                  setactiveCity(v.name);
                  setState(v.state);
                },
              }}>
                {activeCity && <Popup>
                  <div>
                    <h3>{activeCity}</h3>
                    <h4>State: {state}</h4>
                    {<MapEvents city={v.name}/>}
                  </div>
                </Popup>}
              </Marker>
            ))}
            {activeCity && <MapEvents city={activeCity} />}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

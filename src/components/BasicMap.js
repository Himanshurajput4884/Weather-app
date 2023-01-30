import React from "react";
import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import "./Basicmap.css";
import MapEvents from "./MapEvents";

export default function BasicMap() {
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
              onClick={(e) => {
                console.log("E value -> ", e);
              }}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEvents />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

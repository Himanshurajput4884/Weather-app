import React, { useEffect, useState } from "react";

export default function MapEvents(props) {
  const [activeCity, setactiveCity] = useState(props.city);
  const [data, setData] = useState(null);
  const API_KEY = "0835524e9286c4de06a03df77d17bd17";

  useEffect(() => {
    getTempData(API_KEY, activeCity);
  }, [activeCity]);

  const getTempData = (api, query) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&units=metric&appid=${api}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log("error in get data ", err);
        setData(null);
      });
  };

  if (data !== null && data.length !== 2) {
    return (
      <div>
        <p>
          Temperature: {data.main.temp}
          <br></br>
          Pressure: {data.main.pressure}
          <br></br>
          Weather: {data.weather[0].main}
          <br></br>
          Humidity: {data.main.humidity}
        </p>
      </div>
    );
  } else {
    return false;
  }
}

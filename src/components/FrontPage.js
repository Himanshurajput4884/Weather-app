import React, { useEffect, useState, useMemo } from "react";
import Display from "./Display";
import Pagination from "./Pagination";
import citiesData from "./cities.json";

function FrontPage() {
  const [city_name, setvalue] = useState("");
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const API_KEY = "0835524e9286c4de06a03df77d17bd17";
  
  useEffect(() => {
    getTempData(API_KEY, city_name);
  }, [city_name]);

  const getTempData = (api, query) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
        setCity(query);
        setLoading(false);
        // console.log(res);
      })
      .catch((err) => {
        setLoading(true);
        console.log("error in get data", err);
        setData(null);
      });
  };

  const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === "[object Object]";
  };


  

  let newData = [];
  if (data !== null) {
    delete data.cod; 
    delete data.dt;
    delete data.id;
    delete data.clouds;
    delete data.wind;
    for (let keys in data) {
      let x = data[keys];
      if (isObject(x)) {
        newData.push(x);
      } else if (Array.isArray(x)) {
        for (let objj in x) {
          newData.push(x[objj]);
        }
      } else {
        let tt = {};
        tt[keys] = x;
        newData.push(tt);
      }
    }
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = newData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container pt-5">
      <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
        
        onChange={(e) => {
          console.log("e.target.value", e.target.value);
          setvalue(e.target.value);
        }}
      >
        <option value="DEFAULT">Select City</option>
        {citiesData.map((v, i) => (
          <option key={v.name} alue={v.name}>{v.name}</option>
        ))}
      </select>
      {!city_name.length ? null : newData.length !== 1 ? (
        <div className="container mt-5">
          <Display item={currentPosts} loading={loading} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={newData.length}
            paginate={paginate}
          />
        </div>
      ) : (
        <p className="weather-valid-city-name"></p>
      )}
    </div>
  );
}

export default FrontPage;

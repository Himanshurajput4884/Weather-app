import React, { useEffect, useState, useMemo } from "react";
import Display from "./Display";
import Pagination from "./Pagination";


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

  let options = [
    {
      id: "1",
      name: "Mumbai",
      state: "Maharashtra",
    },
    {
      id: "2",
      name: "Delhi",
      state: "Delhi",
    },
    {
      id: "3",
      name: "Bengaluru",
      state: "Karnataka",
    },
    {
      id: "4",
      name: "Ahmedabad",
      state: "Gujarat",
    },
    {
      id: "5",
      name: "Hyderabad",
      state: "Telangana",
    },
    {
      id: "6",
      name: "Chennai",
      state: "Tamil Nadu",
    },
    {
      id: "7",
      name: "Kolkata",
      state: "West Bengal",
    },
    {
      id: "8",
      name: "Pune",
      state: "Maharashtra",
    },
    {
      id: "9",
      name: "Jaipur",
      state: "Rajasthan",
    },
    {
      id: "10",
      name: "Surat",
      state: "Gujarat",
    },
    {
      id: "11",
      name: "Lucknow",
      state: "Uttar Pradesh",
    },
    {
      id: "12",
      name: "Kanpur",
      state: "Uttar Pradesh",
    },
    {
      id: "13",
      name: "Nagpur",
      state: "Maharashtra",
    },
    {
      id: "14",
      name: "Patna",
      state: "Bihar",
    },
    {
      id: "15",
      name: "Indore",
      state: "Madhya Pradesh",
    },
    {
      id: "16",
      name: "Thane",
      state: "Maharashtra",
    },
    {
      id: "17",
      name: "Bhopal",
      state: "Madhya Pradesh",
    },
    {
      id: "18",
      name: "Visakhapatnam",
      state: "Andhra Pradesh",
    },
    {
      id: "19",
      name: "Vadodara",
      state: "Gujarat",
    },
    {
      id: "20",
      name: "Firozabad",
      state: "Uttar Pradesh",
    },
    {
      id: "21",
      name: "Ludhiana",
      state: "Punjab",
    },
    {
      id: "22",
      name: "Rajkot",
      state: "Gujarat",
    },
    {
      id: "23",
      name: "Agra",
      state: "Uttar Pradesh",
    },
    {
      id: "24",
      name: "Siliguri",
      state: "West Bengal",
    },
    {
      id: "25",
      name: "Nashik",
      state: "Maharashtra",
    },
    {
      id: "26",
      name: "Faridabad",
      state: "Haryana",
    },
    {
      id: "27",
      name: "Patiala",
      state: "Punjab",
    },
    {
      id: "28",
      name: "Meerut",
      state: "Uttar Pradesh",
    },
    {
      id: "29",
      name: "Kalyan-Dombivali",
      state: "Maharashtra",
    },
    {
      id: "30",
      name: "Vasai-Virar",
      state: "Maharashtra",
    },
  ];

  return (
    <div className="container pt-5">
      <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
        
        onChange={(e) => {
          console.log("e.target.value", e.target.value);
          setvalue(e.target.value);
        }}
      >
        <option value="DEFAULT">Select City</option>
        {options.map(({ name }, index) => (
          <option value={name}>{name}</option>
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

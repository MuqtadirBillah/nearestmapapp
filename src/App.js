import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {

  

  var [long, setLong] = useState('');
  var [lat, setLat] = useState('');
  var [hosData, setHosData] = useState([]);
  var [text, setText] = useState('Gulshan E Iqbal Karachi');

  useEffect(()=>{
      var mapboxUrl = '';
      navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?type=poi&proximity='+position.coords.longitude+','+position.coords.latitude+'&access_token=pk.eyJ1IjoiYWJiYXNpbXVzYWIiLCJhIjoiY2wzMWQxNnhrMXl2ZDNqbGJiaWppeWZmOSJ9.Ru2SW0peBw9DDcCfOqLf9A'
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          axios.get(mapboxUrl)
          .then(function (response){
              console.log(response)
              setHosData(response.data.features)
          });
      });
  }, []);

  function searchLocation(){
      axios.get('https://api.geoapify.com/v1/geocode/search?text='+text+'&limit=5&format=json&apiKey=a22fe58258064fceb2e72f4dd868a0a4')
      .then(async function (response){
          console.log(response);
          console.log(lat);
          await setLong(response.data.results[0].lon);
          await setLat(response.data.results[0].lat);
          console.log(lat);
          const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?type=poi&proximity='+response.data.results[0].lon+','+response.data.results[0].lat+'&access_token=pk.eyJ1IjoiYWJiYXNpbXVzYWIiLCJhIjoiY2wzMWQxNnhrMXl2ZDNqbGJiaWppeWZmOSJ9.Ru2SW0peBw9DDcCfOqLf9A'
          axios.get(mapboxUrl)
          .then(function (response){
              console.log(response)
              setHosData(response.data.features)
          });
      });
  }


  return (
    <div className="nearestHospitals">
        <div className="mapp">
            <iframe src={"https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d57902.906067752614!2d"+long+"!3d"+lat+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1shospital!5e0!3m2!1sen!2sus!4v1648021097537!5m2!1sen!2sus"} width="100%" height="100%" allowFullScreen={''} loading="lazy"></iframe>
            <div className="searchbar">
                <div className="bar">
                    <div className="input">
                        <input type="text" placeholder='Search for a place' onChange={(e)=>{setText(e.target.value)}} />
                    </div>
                    <div className="searchbut">
                        <button onClick={()=>{searchLocation()}}><i className="fas fa-search"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;

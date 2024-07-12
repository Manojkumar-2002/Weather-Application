import { useEffect, useState } from 'react';
import './WeatherApp.css';
import WeatherDetails from './WeatherDetails';
import axios from 'axios';
import { WiDaySunny, WiNightClear, WiCloud, WiCloudy, WiDayCloudy, WiNightCloudy, WiRain, WiDayRain, WiNightRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi';
import { FaSearch } from 'react-icons/fa'; 

function WeatherApp() {
  const api_key = import.meta.env.VITE_API_KEY;
  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState(<WiDaySunny />);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": <WiDaySunny />,
    "01n": <WiNightClear />,
    "02d": <WiDayCloudy />,
    "02n": <WiNightCloudy />,
    "03d": <WiCloud />,
    "03n": <WiCloud />,
    "04d": <WiCloudy />,
    "04n": <WiCloudy />,
    "09d": <WiRain />,
    "09n": <WiRain />,
    "10d": <WiDayRain />,
    "10n": <WiNightRain />,
    "11d": <WiThunderstorm />,
    "11n": <WiThunderstorm />,
    "13d": <WiSnow />,
    "13n": <WiSnow />,
    "50d": <WiFog />,
    "50n": <WiFog />
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
    try {
      let res = await axios.get(url);
      let data = res.data;
      if (data.cod === "404") {
        setCityNotFound(true);
        setError(null);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || <WiDaySunny />);
      setCityNotFound(false);
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching data.");
      setCityNotFound(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, []);

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className='container'>
      <div className="input-container">
        <input type="text" className='cityInput' placeholder='Search city' onChange={handleCity} value={text} onKeyDown={handleKeyDown} />
        <div className="search-icon" onClick={search}>
          <FaSearch />
        </div>
      </div>
      {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={long} humidity={humidity} wind={wind} />}
      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {cityNotFound && <div className="city-not-found">City Not Found</div>}
    </div>
  );
}

export default WeatherApp;

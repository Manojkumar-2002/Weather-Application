// src/components/WeatherDetails.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';

const WeatherDetails = ({ icon, temp, city, country, lat, long, humidity, wind }) => {
  return (
    <>
      <div className="images">
        {icon}
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}, {country}</div>
      <div className="coord">
        <div>
          <span className="lat">Latitude</span>
          <span className='coordspan'>{lat}</span>
        </div>
        <div>
          <span className="long">Longitude</span>
          <span className='coordspan'>{long}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <WiHumidity className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <WiStrongWind className="icon" />
          <div className="data">
            <div className="wind-speed">{wind} m/s</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

WeatherDetails.propTypes = {
  icon: PropTypes.node.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
};

export default WeatherDetails;

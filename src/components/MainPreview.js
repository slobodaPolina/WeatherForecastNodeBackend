import React from 'react';
import WeatherImage from './WeatherImage';

function MainPreview(props) {
  return (
      <div className="width45 column">
          <div className="mainTitle bigText">{props.data.name}</div>
          <div className="row">
              <WeatherImage name={props.data.weather[0].main}/>
              <div className="hugeText">{props.data.main.temp}°C</div>
          </div>
      </div>
  );
}

export default MainPreview;

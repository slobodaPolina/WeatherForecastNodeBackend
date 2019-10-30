import React from 'react';

function Forecast(props) {
  return (
    <div className="forecastContainer column">
        <div className="forecastRow row">
            <div className="paramTitle">Ветер</div>
            <div className="paramValue">{props.data.wind.speed} meter/sec</div>
        </div>
        <div className="forecastRow row">
            <div className="paramTitle">Облачность</div>
            <div className="paramValue">{props.data.weather[0].description}</div>
        </div>
        <div className="forecastRow row">
            <div className="paramTitle">Давление</div>
            <div className="paramValue">{props.data.main.pressureMmHg} mm Hg</div>
        </div>
        <div className="forecastRow row">
            <div className="paramTitle">Влажность</div>
            <div className="paramValue">{props.data.main.humidity}%</div>
        </div>
        <div className="forecastRow row">
            <div className="paramTitle">Координаты</div>
            <div className="paramValue">[{props.data.coord.lon}, {props.data.coord.lat}]</div>
        </div>
    </div>
  );
}

export default Forecast;

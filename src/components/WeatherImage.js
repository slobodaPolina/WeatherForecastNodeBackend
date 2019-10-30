import React from 'react';

function WeatherImage(props) {
  return (
      <img className="weatherImage" src={"/images/" + props.name + ".jpg"} alt="Weather" />
  );
}

export default WeatherImage;

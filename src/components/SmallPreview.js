import React from 'react';
import WeatherImage from './WeatherImage';

class SmallPreview extends React.Component {
    render() {
        return (
            <div className="row SmallPreviewContainer">
                <div className="width45 row">
                    <div className="cityTitle">{this.props.city.name}</div>
                    {this.props.city.loaded ?
                        <div className="cityTemp">{this.props.city.main.temp} °C</div> : ""
                    }
                    {this.props.city.loaded ?
                        <div className="width36px">
                            <WeatherImage name={this.props.city.weather[0].main}/>
                        </div> : ""
                    }
                </div>
                <button className="roundButton removeButton"
                    onClick={this.props.removeCity}>+</button>
            </div>
        );
    }
}

export default SmallPreview;

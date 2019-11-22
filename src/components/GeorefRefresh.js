import React from 'react';
import { connect } from 'react-redux';
import { addCityByGeolocation } from '../cityAdder';


export class GeorefRefresh extends React.Component {
    constructor(props) {
        super(props);
        this.addCity = this.addCity.bind(this);
    }

    addCity() {
        this.props.dispatch(addCityByGeolocation());
    }

    render() {
        return (
            <button className="georefRefresh"
                onClick={this.addCity}>
                    Обновить геолокацию
            </button>
        );
    }
}

export default connect()(GeorefRefresh);

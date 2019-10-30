import React from 'react';
import { connect } from 'react-redux';
import { addCityByGeolocation } from '../cityAdder';
import MainPreview from './MainPreview';
import Forecast from './Forecast';
import Loading from './Loading';

export class MainBlock extends React.Component {
    render() {
        if (this.props.data !== null) {
            return (
                <div className="row main">
                    <MainPreview data={this.props.data}/>
                    <div className="width45">
                        <Forecast data={this.props.data}/>
                    </div>
                </div>
            );
        } else {
            this.props.dispatch(addCityByGeolocation());
            return <Loading />;
        }
    }
}

export const MainBlockContainer = connect(
    state => ({ data: state.geolocation })
)(MainBlock);

export default MainBlockContainer;

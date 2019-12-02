import React from 'react';
import { connect } from 'react-redux';
import { addCityByGeolocation } from '../cityAdder';
import MainPreview from './MainPreview';
import Forecast from './Forecast';
import Loading from './Loading';

export class MainBlock extends React.Component {
    render() {
        if (this.props.data !== null) { // we know current geolocation
            let MINUTES_TO_BECOME_STALE = 30.0;
            let millisecDiff = Date.now() - (this.props.data.timeLoaded ? this.props.data.timeLoaded : new Date(0));
            let isOld = (millisecDiff / (1000 * 60)) > MINUTES_TO_BECOME_STALE;
            let oldCashedData = isOld ?
                <div className="error-message">
                    Please pay attention you see cashed stale data of your location. In order to update your geolocation or refresh cashed weather data, click the refresh button
                </div> : "";

            return (
                <div>
                    <div className="row main">
                        <MainPreview data={this.props.data}/>
                        <div className="width45">
                            <Forecast data={this.props.data}/>
                        </div>
                    </div>
                    {oldCashedData}
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

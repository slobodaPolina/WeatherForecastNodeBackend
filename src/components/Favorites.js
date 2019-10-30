import React from 'react';
import { connect } from 'react-redux';
import Forecast from './Forecast';
import SmallPreview from './SmallPreview';
import Loading from './Loading';

export class Favorites extends React.Component {
    render() {
        return (
            <div className="favorites">
                {this.props.favorites.map((city, i) => {
                    return (
                        <div className="smallCityCard" key={city.name} >
                            <SmallPreview city={city} removeCity={this.removeGenerator(city.name)} />
                            {city.loaded ? <Forecast data={city}/> : <Loading />}
                        </div>
                    )
                })}
            </div>
        );
    }

    removeGenerator(cityName) {
        return () => this.props.dispatch({
            type: 'REMOVE_FAVORITE', cityName
        });
    }
}

export const FavoritesContainer = connect(
    state => ({ favorites: state.favorites })
)(Favorites);

export default FavoritesContainer;

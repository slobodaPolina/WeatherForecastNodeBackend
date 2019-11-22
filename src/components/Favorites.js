import React from 'react';
import Forecast from './Forecast';
import SmallPreview from './SmallPreview';
import Loading from './Loading';
import { getCityByName, getTheFavorites, deleteCityFromTheFavorites } from "../cityAdder";

export class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: []
        };
        getTheFavorites(
            (data) => {
                data.forEach(name => {
                    getCityByName(
                        name,
                        (data) => {
                            this.addToTheFavorites(Object.assign(data, { loaded: true }));
                        },
                        () => {
                            console.error("Error getting favorite city " + name + " from weather API");
                            this.addToTheFavorites({
                                name,
                                loaded: false
                            });
                        }
                    );
                });
            },
            () => console.error("Problems getting list of favorite cities from db!")
        );
    }

    render() {
        return (
            <div className="favorites">
                {this.props.favorites.map((city) => {
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
        return () => deleteCityFromTheFavorites(
            cityName,
            () => {
                this.setState({
                    favorites: this.state.favorites.filter(city => city.name !== cityName)
                })
                // todo synchronize with searchbar!
            },
            () => { console.error("Problems removing city " + cityName + " from db!") }
         );
    }

    addToTheFavorites(obj) {
        // todo synchronize with searchbar!
        this.setState({
            favorites: this.state.favorites.push(obj)
        });
    }
}

export default Favorites;

import React from 'react';
import Forecast from './Forecast';
import SmallPreview from './SmallPreview';
import Loading from './Loading';
import { getCityByName, getTheFavorites, addCityToTheFavorites, deleteCityFromTheFavorites } from "../cityAdder";

export class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "", // it is the text from the searchBar
            isCityValid: true, // is the city user tried t add valid
            favorites: [] // array of objects of favorite cities. We keep only names in db
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        getTheFavorites(
            ({ data }) => {
                data.forEach(({ _id: name }) => {
                    getCityByName(
                        name,
                        (data) => {
                            this.addToTheFavorites(Object.assign(data, { loaded: true }));
                        },
                        error => {
                            console.error("Error getting favorite city " + name + " from weather API");
                            console.error(error);
                            this.addToTheFavorites({
                                name,
                                loaded: false
                            });
                        }
                    );
                });
            }
        );
    }

    render() {
        let msg = this.state.isCityValid ? "" : <div className="error-message">Seems like the city is not valid</div>;
        return (
            <div>
                <div>
                    <div className="search-bar row">
                        <div className="bigText">Избранное</div>
                        <div>
                            <form onSubmit={this.handleSearch}>
                                <input id="search-input" type="search"
                                       placeholder="Добавить новый город" value={this.state.city} onChange={this.handleInputChange}/>
                                <button className="search-button roundButton">+</button>
                            </form>
                        </div>
                    </div>
                    {msg}
                </div>
                <div className="favorites">
                    {this.state.favorites.map((city) => {
                        return (
                            <div className="smallCityCard" key={city.name}>
                                <SmallPreview city={city} removeCity={this.removeGenerator(city.name)}/>
                                {city.loaded ? <Forecast data={city}/> : <Loading />}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }

    handleInputChange(event) {
        this.setState({city: event.target.value});
    }

    handleSearch(event) {
        const getCallback = (isSuccess) => () => {
            this.setState({isCityValid: isSuccess});
            // todo remove loading card anyway
            if (isSuccess) { // means we got data from weather service
                addCityToTheFavorites(
                    this.state.city,
                    () => {
                        this.setState({favorites: this.state.favorites.push(this.state.city)});
                        this.setState({city: ""});
                    },
                    () => {
                        console.error('error during saving favorite city in db!');
                        this.setState({isCityValid: false});
                    }
                );
            }
        };

        event.preventDefault();
        if (this.props.favorites.find(city => city.name === this.state.city)) { // if we already have it we wont add it again
            this.setState({isCityValid: false});
        } else {
            // todo start the loader on the citycard
            // load real data and display it
            getCityByName(
                this.state.city,
                getCallback(true),
                getCallback(false)
            );
        }
    }

    removeGenerator(cityName) {
        return () => deleteCityFromTheFavorites(
            cityName,
            () => {
                this.setState({
                    favorites: this.state.favorites.filter(city => city.name !== cityName)
                })
            },
            () => { console.error("Problems removing city " + cityName + " from db!") }
         );
    }

    addToTheFavorites(obj) {
        this.setState({
            favorites: this.state.favorites.push(obj)
        });
    }
}

export default Favorites;

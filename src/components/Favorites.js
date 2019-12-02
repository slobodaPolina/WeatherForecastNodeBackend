import React from 'react';
import Forecast from './Forecast';
import SmallPreview from './SmallPreview';
import Loading from './Loading';
import { getCityByName, getTheFavoritesDB, addCityToTheFavoritesDB, deleteCityFromTheFavoritesDB } from "../cityAdder";

export class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "", // it is the text from the searchBar
            isCityValid: true, // is the city user tried t add valid
            areLoadedFavorites: true, //are all of the favorites loaded successfully
            favorites: [] // array of objects of favorite cities. We keep only names in db
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        getTheFavoritesDB(
            ({ data }) => {
                data.forEach(({ _id: name }) => {
                    getCityByName(
                        name,
                        (data) => {
                            this.addToTheFavoritesStore(Object.assign(data, { loaded: true }));
                        },
                        error => {
                            console.error(error);
                            this.setState({ areLoadedFavorites: false });
                        }
                    );
                });
            }
        );
    }

    render() {
        // users mistake
        let badInputCity = this.state.isCityValid ? "" : <div className="error-message">Seems like the city you are searching for is not valid</div>;
        // something is wrong with connections or smth like this. Normally is never shown
        let problemsLoadingFavorites = this.state.areLoadedFavorites ? "" : <div className="error-message">Cant load some of your favorites due to technical problems</div>;
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
                    {badInputCity}
                    {problemsLoadingFavorites}
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
        this.setState({ city: event.target.value });
    }

    handleSearch(event) {
        const getCallback = (isSuccess) => (data) => {
            this.setState({ isCityValid: isSuccess });
            this.removeFromTheFavoritesStore(this.state.city);
            if (isSuccess) { // means we got data from weather service
                addCityToTheFavoritesDB(
                    this.state.city,
                    () => {
                        this.addToTheFavoritesStore(data);
                        this.setState({ city: "" });
                    },
                    (error) => {
                        console.error(error);
                        this.setState({ areLoadedFavorites: false });
                    }
                );
            }
        };

        event.preventDefault();
        // if we already have it we wont add it again
        if (this.state.favorites.find(city => city.name.toLowerCase() === this.state.city.toLowerCase())) {
            this.setState({ isCityValid: false });
        } else {
            // start the loader animation
            this.addToTheFavoritesStore({
                name: this.state.city,
                loaded: false
            });
            // load real data and display it
            getCityByName(
                this.state.city,
                getCallback(true),
                getCallback(false)
            );
        }
    }

    removeGenerator(cityName) {
        return () => deleteCityFromTheFavoritesDB(
            cityName,
            () => { this.removeFromTheFavoritesStore(cityName); },
            (error) => {
                console.error(error);
                this.setState({ areLoadedFavorites: false });
            }
         );
    }

    addToTheFavoritesStore(obj) {
        // to ensure we wont collect duplicates
        this.removeFromTheFavoritesStore(obj.name);
        this.setState({
            favorites: this.state.favorites.concat([obj])
        });
    }

    removeFromTheFavoritesStore(cityName) {
        this.setState({
            favorites: this.state.favorites.filter(city => city.name.toLowerCase() !== cityName.toLowerCase())
        });
    }
}

export default Favorites;
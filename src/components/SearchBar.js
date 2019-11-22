import React from 'react';
import { getCityByName, getTheFavorites, addCityToTheFavorites } from '../cityAdder';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            isCityValid: true,
            favorites: []
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        getTheFavorites(
            (data) => {this.state.favorites.push(data)},
            () => console.error("Problems getting favorite cities!")
        );
    }

    render() {
        let msg = this.state.isCityValid ? "" : <div className="error-message">Seems like the city is not valid</div>;
        return (
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
        if (this.props.favorites.find(cityName => cityName === this.state.city)) { // if we already have it we wont add it again
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
}

export default SearchBar;

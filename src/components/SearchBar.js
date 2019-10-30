import React from 'react';
import { connect } from 'react-redux';
import { addCityByName } from '../cityAdder';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            isCityValid: true
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
        var getCallback = (isSuccess) => () => {
            this.setState({isCityValid: isSuccess});
            // remove loading card anyway
            this.props.dispatch({
                type: 'REMOVE_FAVORITE',
                cityName: this.state.city
            });
            if (isSuccess) {
                this.setState({city: ""});
            }
        }

        event.preventDefault();
        if (this.props.favorites.find(city => city.name === this.state.city)) {
            this.setState({isCityValid: false});
        } else {
            // it is just to start the loader
            this.props.dispatch({
                type: 'ADD_FAVORITE',
                city: {name: this.state.city}
            });
            // load real data and display it
            this.props.dispatch(
                addCityByName(
                    this.state.city,
                    'ADD_FAVORITE',
                    getCallback(true),
                    getCallback(false)
                )
            );
        }
    }
}

export const SearchBarContainer = connect(
    state => ({ favorites: state.favorites })
)(SearchBar);

export default SearchBarContainer;

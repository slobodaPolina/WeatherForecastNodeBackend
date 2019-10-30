import React from 'react';
import renderer from 'react-test-renderer';
import { SearchBar } from '../src/components/SearchBar';

it('renders SearchBar correctly', () => {
    const tree = renderer.create(
        <SearchBar/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders SearchBar non valid city correctly', () => {
    const component = renderer.create(
        <SearchBar/>
    );
    component.getInstance().setState({isCityValid: false});
    expect(component.toJSON()).toMatchSnapshot();
});

it('renders SearchBar with city correctly', () => {
    const component = renderer.create(
        <SearchBar/>
    );
    component.getInstance().setState({city: "London"});
    expect(component.toJSON()).toMatchSnapshot();
});

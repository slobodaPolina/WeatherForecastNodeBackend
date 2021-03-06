import React from 'react';
import GeorefRefresh from './GeorefRefresh';
import MainBlock from './MainBlock';
import Favorites from './Favorites';

function App(props) {
    return (
        <div className="fixed-margin-children">
            <div className="header">
                <div className="bigText flex1">Погода здесь</div>
                <GeorefRefresh />
                <div className="flex1"></div>
            </div>
            <MainBlock />
            <Favorites />
        </div>
    );
}

export default App;

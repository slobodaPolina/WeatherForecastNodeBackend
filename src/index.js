import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore,  applyMiddleware } from 'redux';
import { loadState, saveState } from './localStorage';
import rootReducer from './reducers';
import './index.css';
import App from './components/App';

const store = createStore(
    rootReducer,
    loadState(),
    applyMiddleware(thunk)
);
store.subscribe(() => saveState(store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

var defaultState = {
    geolocation: null,
    favorites: []
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        return serializedState === null ? defaultState : JSON.parse(serializedState);
    } catch (err) {
        return defaultState;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {}
};

export default { loadState, saveState };

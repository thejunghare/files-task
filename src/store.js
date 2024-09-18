import {createStore} from 'redux';

const intialState = {
    data: [],
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {...state, data: action.payload};
        default:
            return state;
    }
};

const store = createStore(reducer)

export default store;
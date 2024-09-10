import { createStore } from 'redux';

const initialState = {
    tasks: []
};

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'DELETE_TASK':
            return { ...state, tasks: state.tasks.filter((_, index) => index !== action.payload) };
        default:
            return state;
    }
}

const store = createStore(taskReducer);

export default store;

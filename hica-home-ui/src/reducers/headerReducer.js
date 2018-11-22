const initialState = {
    language: "en"
};

const todos = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LANGUAGE':
            state.language = action.language
            break;
        default:
            break;
    }
    return state;
}

export default todos

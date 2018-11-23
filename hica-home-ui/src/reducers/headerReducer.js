const initialState = {
    language: "en"
};

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return { ...state, language: action.language };
        default:
            return state;
    }
}

export default headerReducer

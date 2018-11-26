const initialState = {
    language: "zh",
    alert: {
        isOpen: false,
        color: 'info',
        message: ''
    }
};

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return { ...state, language: action.language };
        case 'SET_ALERT':
            return { ...state, alert: action.alert };
        default:
            return state;
    }
}

export default headerReducer

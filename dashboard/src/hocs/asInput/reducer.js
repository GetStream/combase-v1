export default (state, action) => {
    switch (action.type) {
        case "Input/Blur":
            return { ...state, focused: false };
        case "Input/Focus":
            return { ...state, focused: true };
        case "Input/Change":
            return { ...state, hasValue: action.hasValue };
        default:
            return state;
    }
}
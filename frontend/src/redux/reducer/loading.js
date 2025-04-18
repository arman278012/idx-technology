export const loadingReducer = (
    state = { loading: false, },
    { type, payload }
) => {
    switch (type) {
        case "SHOW_LOADING":
            return { ...state, loading: true };
        case "LOADING_SUCCESS":
            return { ...state, loading: false };
        case "HIDE_LOADING":
            return { ...state, loading: false };
        default:
            return state;
    }
};
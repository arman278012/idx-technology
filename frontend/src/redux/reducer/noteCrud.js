export const noteReducer = (
    state = { addNoteLoading: false, newNote: {}, allnotes: [], singleLoading: false, singleNoteData: {}, deleteLoading: false },
    { type, payload }
) => {
    switch (type) {
        case "ADD_NEW_NOTE_LOADING":
            return { ...state, addNoteLoading: true };
        case "ADD_NEW_NOTE_SUCCESS":
            return { ...state, newNote: payload, addNoteLoading: false };
        case "ADD_NEW_NOTE_FAILED":
            return { ...state, addNoteLoading: false };
        case "READ_ALL_NOTE_LOADING":
            return { ...state, addNoteLoading: true };
        case "READ_ALL_NOTE_SUCCESS":
            return { ...state, allnotes: payload, addNoteLoading: false };
        case "READ_ALL_NOTE_FAILED":
            return { ...state, addNoteLoading: false };
        case "READ_SINGLE_NOTE_LOADING":
            return { ...state, singleLoading: true };
        case "READ_SINGLE_NOTE_SUCCESS":
            return { ...state, singleNoteData: payload, singleLoading: false };
        case "READ_SINGLE_NOTE_FAILED":
            return { ...state, singleLoading: false };
        case "READ_SINGLE_NOTE_DELETE_LOADING":
            return { ...state, deleteLoading: true };
        case "READ_SINGLE_NOTE_DELETE_SUCCESS":
            return { ...state, deleteLoading: false };
        case "READ_SINGLE_NOTE_DELETE_FAILED":
            return { ...state, deleteLoading: false };
        default:
            return state;
    }
};
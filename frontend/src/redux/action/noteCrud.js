import toast from "react-hot-toast";
import { noteBook } from "../config/urlConfig";

export const addNewNote = (note, navigate) => async (dispatch) => {
    dispatch({ type: "ADD_NEW_NOTE_LOADING" });

    try {
        const { data } = await noteBook.post(`/notes/add-note`, note);

        dispatch({ type: "ADD_NEW_NOTE_SUCCESS", payload: data });

        toast.success("📝 Note added successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });

        navigate("/all-notes");
    } catch (error) {
        dispatch({ type: "ADD_NEW_NOTE_FAILED" });

        toast.error(
            error?.response?.data?.message || "Failed to add note. Please try again.",
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            }
        );

        console.error("Add Note Error:", error);
    }
};

export const readAllNotes = (userId) => async (dispatch) => {
    dispatch({ type: "READ_ALL_NOTE_LOADING" });
    try {
        const { data } = await noteBook.get(`/notes/get-all-notes/${userId}`)
        dispatch({ type: "READ_ALL_NOTE_SUCCESS", payload: data });
    }
    catch (error) {
        dispatch({ type: "READ_ALL_NOTE_FAILED" });
        console.log(error)
    }

}

export const readSingleNote = (id) => async (dispatch) => {
    dispatch({ type: "READ_SINGLE_NOTE_LOADING" });
    try {
        const { data } = await noteBook.get(`/notes/get-single-note/${id}`)
        dispatch({ type: "READ_SINGLE_NOTE_SUCCESS", payload: data });
    }
    catch (error) {
        dispatch({ type: "READ_SINGLE_NOTE_FAILED" });
        console.log(error)
    }
}

export const updateSingleNote = (id, updateNote, navigate) => async (dispatch) => {
    dispatch({ type: "READ_SINGLE_NOTE_DELETE_LOADING" });

    try {
        const { data } = await noteBook.patch(`/notes/edit-note/${id}`, updateNote);

        toast.success("✅ Note updated successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });

        // If you prefer navigation over hard redirect:
        navigate("/all-notes");
        // Or use this if you're not passing `navigate`:
        // window.location.href = "/all-notes";

        dispatch(readSingleNote(id));
        dispatch({ type: "READ_SINGLE_NOTE_DELETE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "READ_SINGLE_NOTE_DELETE_FAILED" });

        toast.error(
            error?.response?.data?.message || "❌ Failed to update the note. Please try again.",
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            }
        );

        console.error("Update Note Error:", error);
    }
};

export const deleteSingleNote = (id, navigate) => async (dispatch) => {
    dispatch({ type: "READ_SINGLE_NOTE_DELETE_LOADING" });

    try {
        const { data } = await noteBook.delete(`/notes/delete-note/${id}`);

        toast.success("🗑️ Note deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });

        navigate("/all-notes");
        dispatch({ type: "READ_SINGLE_NOTE_DELETE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "READ_SINGLE_NOTE_DELETE_FAILED" });

        toast.error(
            error?.response?.data?.message || "❌ Failed to delete the note.",
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            }
        );

        console.error("Delete Note Error:", error);
    }
};
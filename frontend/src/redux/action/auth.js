import toast from "react-hot-toast";
import { noteBook } from "../config/urlConfig";

export const registerUser = (name, emailId, password, phoneNumber, setBtnSpinner) => async (dispatch) => {
    dispatch({ type: "SHOW_LOADING" });

    try {
        const { data } = await noteBook.post(`/users/signup`, {
            name,
            emailId,
            password,
            phoneNumber,
        });


        // Store token and userId in localStorage
        localStorage.setItem("notes-token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("email", data.emailId);
        localStorage.setItem("name", data.name);

        toast.success(`🎉 Welcome ${data.name || name}! Registration successful.`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });

        // Redirect user to /all-notes page after successful signup
        window.location.href = "/all-notes";
        dispatch({ type: "LOADING_SUCCESS" });

    } catch (error) {
        setBtnSpinner(false);
        dispatch({ type: "HIDE_LOADING" });

        toast.error(error?.response?.data?.message || "Something went wrong during registration.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });

        console.error("Registration Error:", error);
    }
    finally {
        setBtnSpinner(false);
    }
};

export const loginUser = (emailId, password, setBtnSpinner) => async (dispatch) => {
    dispatch({ type: "SHOW_LOADING" });

    try {
        const { data } = await noteBook.post(`/users/login`, {
            emailId,
            password,
        });

        // Save token and userId in localStorage
        localStorage.setItem("notes-token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("email", data.emailId);
        localStorage.setItem("name", data.name);

        // Show success toast
        toast.success("🎉 Logged in successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });

        // Navigate to all-notes
        window.location.href = "/all-notes";

        dispatch({ type: "LOADING_SUCCESS" });
    } catch (error) {
        dispatch({ type: "HIDE_LOADING" });

        // Show error toast
        toast.error(
            error?.response?.data?.message || "Login failed. Please try again.",
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
        console.error("Login Error:", error);
    }
    finally {
        setBtnSpinner(false)
    }

};

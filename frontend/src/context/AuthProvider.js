import { useState } from "react"
import AuthContext from "./AuthContext"

const AuthProvider = ({ children }) => {
    const [deletePopup, setDeletePopup] = useState(false)
    const [btnSpinner, setBtnSpinner] = useState(false)
    return (
        <AuthContext.Provider value={{ deletePopup, setDeletePopup, btnSpinner, setBtnSpinner }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
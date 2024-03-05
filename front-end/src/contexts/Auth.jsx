import { useState, useEffect, createContext } from "react";
import PropTypes from 'prop-types';
import { withdraw } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const user = withdraw().user;
        if(user) {
            setUserEmail(user.email);
            setIsAdmin(user.isAdmin);
            setUserId(user._id);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            userEmail,
            setUserEmail,
            isAdmin,
            setIsAdmin,
            userId,
            setUserId
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]),
};

export default AuthContext;


import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { store, withdraw } from '../utils/storage';
import { useContext } from 'react';
import AuthContext from '../contexts/Auth';
import { useNavigate } from 'react-router-dom';

const Google = () => {
    const { setUserEmail, setIsAdmin, setUserId } = useContext(AuthContext);
    const handleError = () => {
        alert('Login Failed');
    }
    const navigate = useNavigate();
    const handleSuccess = async(response) => {
        try {
            const api = import.meta.env.VITE_AUTH + '/google';
            const res = await axios.post(api,{response});
            store(res.data.payload);
            const user = withdraw().user;
            setUserEmail(user.email);
            setIsAdmin(user.isAdmin);
            setUserId(user._id);
            navigate("/");
        } catch (error) {
            alert('No User Found.!');
        }
    }
    return <GoogleLogin
        onSuccess={response => handleSuccess(response)}
        onError={handleError}
        text="Signin With"
        shape='square'
        size='larger'
        width='50'
    />
}

export default Google;
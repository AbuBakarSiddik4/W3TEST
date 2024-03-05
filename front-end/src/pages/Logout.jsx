import axios from 'axios';
import { remove, withdraw } from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/Auth';

const Logout = () => {
    const { setUserEmail, setIsAdmin, setUserId } = useContext(AuthContext);
    const navigate = useNavigate();
    if (confirm('You are going to logout! Are you sure?')) {
        const apiEndPoint = import.meta.env.VITE_AUTH + '/logout';
        const removeUserData = async () => {
            try {
                await axios.post(apiEndPoint, null, {
                    headers: {
                        Authorization: `Bearer ${withdraw().acess_token}`,
                    }
                });
                remove();
                setIsAdmin('');
                setUserEmail('');
                setUserId('');
                navigate('/login');
            } catch (error) {
                alert(error.response.data.message);
            }
        }
        removeUserData();
    } else {
        navigate('/');
    }
}

export default Logout;
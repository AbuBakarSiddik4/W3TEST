import { Box, Container, Typography } from '@mui/material';
import AuthContext from '../contexts/Auth';

import axios from 'axios';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { store, withdraw } from '../utils/storage';
import Input from '../components/Input';
import ActionButton from '../components/ActionButton';

const Login = () => {
    const { setUserEmail, setIsAdmin, setUserId } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiEndPoint = import.meta.env.VITE_AUTH + '/login';
        try {
            const response = await axios.post(apiEndPoint, { email, password });
            store(response.data.payload);
            const user = withdraw().user;
            setUserEmail(user.email);
            setIsAdmin(user.isAdmin);
            setUserId(user._id);
            console.log(user);
            navigate("/");
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const onPassswordChange = (e) => {
        setPassword(e.target.value);
    }
    return (
        <Container>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Box component={"form"} onSubmit={handleSubmit} sx={{
                    padding: "2% 8%",
                    margin: "2%",
                    borderRadius: "5px"
                }}>
                    <Input value={email} onChange={onEmailChange} label="Enter Your Email" placeholder="Enter Email" type="email" />
                    <Input value={password} onChange={onPassswordChange} label="Enter Your Password" placeholder="Enter Password" type="password" />
                    <Box sx={{
                        display: "flex",
                    }}>
                        <ActionButton action={"Login"}/>
                        <Typography style={{
                            fontSize: "14px",
                            marginLeft: "4px",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            Not a member?
                            <NavLink to="/signup">SignUp</NavLink>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default Login;
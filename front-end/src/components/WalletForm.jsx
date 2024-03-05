import { Box, Container, TextField } from '@mui/material';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';
import axios from 'axios';

// Custom Components.
import Input from './Input';
import ActionButton from './ActionButton';
import { withdraw } from '../utils/storage';

const WalletForm = () => {
    const [wallet, setWallet] = useState('');
    const [recaptcha,setRecaptcha] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!recaptcha) {
            alert('Select captcha');
            return;
        }
        const apiEndPoint = import.meta.env.VITE_TRANSACTION + '/add';
        try {
            await axios.post(apiEndPoint, { wallet }, {
                headers: {
                    Authorization: `Bearer ${withdraw().acess_token}`,
                }
            });
            setWallet('');
            setRecaptcha('');
            alert("Sucessfull");
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    const onChange = (e) => {
        setWallet(e.target.value);
    }
    function onCaptchaChange(value) {
        setRecaptcha(value);
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
                    <Input value={wallet} onChange={onChange} label="Wallet Address" placeholder="Your Wallet Address" type="url" />
                    <Box>
                        <TextField
                            placeholder="20 Test Link"
                            disabled
                            sx={{
                                mr: "5px"
                            }}
                            size='small'
                        />
                        <TextField
                            placeholder="0.5 ETH"
                            disabled
                            size='small'
                        />
                    </Box>
                    <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA}
                        onChange={onCaptchaChange}
                    />
                    <ActionButton action="Send Request" />
                </Box>
            </Box>
        </Container>
    )
}

export default WalletForm;
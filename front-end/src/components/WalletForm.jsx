import { Box, Container, TextField } from '@mui/material';

import { useState } from 'react';
import axios from 'axios';
// Custom Components.
import Input from './Input';
import ActionButton from './ActionButton';
import { withdraw } from '../utils/storage';

const WalletForm = () => {
    const [wallet, setWallet] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiEndPoint = import.meta.env.VITE_TRANSACTION + '/add';
        try {
            const response = await axios.post(apiEndPoint, {wallet},{
                headers: {
                    Authorization: `Bearer ${withdraw().acess_token}`,
                }
            });
            console.log(response);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    const onChange = (e) => {
        setWallet(e.target.value);
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
                    <ActionButton action="Send Request"/>
                </Box>
            </Box>
        </Container>
    )
}

export default WalletForm;
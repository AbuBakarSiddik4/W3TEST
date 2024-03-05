import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { withdraw } from '../utils/storage.js';
import dayjs from 'dayjs';

const CTableCell = styled(TableCell)({
    border: "1px solid #ddd"
})

const formatdate = (date) => {
    return dayjs(date).format('hh:mm A');
}

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const endPoint = import.meta.env.VITE_USER;
            try {
                const response = await axios.get(endPoint, {
                    headers: {
                        Authorization: `Bearer ${withdraw().acess_token}`,
                    }
                });
                setHistory(response.data.payload);
            } catch (error) {
                alert(error.response.data.message);
            }
        }
        fetch();
    }, []);
    return (
        <Box>
            <Typography style={{ color: "#6b6bf5", fontSize: "20px",fontWeight:700 }}>Request History</Typography>
            <Table size='small' stickyHeader>
                <TableHead>
                    <TableRow>

                        <CTableCell>Sr</CTableCell>
                        <CTableCell>Time</CTableCell>
                        <CTableCell>Amount</CTableCell>
                        <CTableCell>Hash</CTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.length > 0 && history.map((his, index) => (
                        <TableRow key={his._id}>
                            <CTableCell>{index + 1}</CTableCell>
                            <CTableCell>{formatdate(his.createdAt)}</CTableCell>
                            <CTableCell>{his.amount}</CTableCell>
                            <CTableCell>{his.hash.slice(0, 8)}</CTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default History;
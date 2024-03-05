import { useEffect, useState } from "react";
import axios from 'axios';
import { withdraw } from "../utils/storage";
import { Box, Table, TableHead, Typography, styled, TableCell, TableRow, TableBody } from "@mui/material";
const CTableCell = styled(TableCell)({
    border: "1px solid #ddd"
})
const AdminDashboard = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const api = import.meta.env.VITE_ADMIN;
        const fetch = async () => {
            const response = await axios.get(api, {
                headers: {
                    Authorization: `Bearer ${withdraw().acess_token}`,
                }
            })
            setUser(response.data.payload);
        };
        fetch();
    }, [])
    return (
        <Box>
            <Typography style={{ color: "#6b6bf5", fontSize: "20px",fontWeight:700 }}>User History</Typography>
            <Table size='small' stickyHeader>
                <TableHead>
                    <TableRow>
                        <CTableCell>ID</CTableCell>
                        <CTableCell>Email</CTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {user.length > 0 && user.map((us) => (
                        <TableRow key={us._id}>
                            <CTableCell>{us._id}</CTableCell>
                            <CTableCell>{us.email}</CTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default AdminDashboard;
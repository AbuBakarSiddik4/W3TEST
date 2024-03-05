import { NavLink } from "react-router-dom";
import { Box, styled } from '@mui/material';
import { useContext } from "react";
import AuthContext from "../contexts/Auth";

const CustomNavLink = styled(NavLink)({
    textDecoration: "none",
    padding: "10px",
    color: "#9b1fe9",
    fontSize: "22px",
    fontWeight: "500",
});

const Navbar = () => {
    const { userEmail } = useContext(AuthContext);
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-around",
            borderBottom: "1px solid #ddd"
        }}>

            <CustomNavLink to="/">Faucets</CustomNavLink>
            {userEmail ? <CustomNavLink to="logout">Logout</CustomNavLink>
                : <>
                    <CustomNavLink to="login">Login</CustomNavLink>
                    <CustomNavLink to="signup">SignUp</CustomNavLink>
                </>
            }
        </Box>
    )
}

export default Navbar;
import { Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const Input = ({ type, label, placeholder, value, onChange }) => {
    return (
        <Box>
            <TextField
                type={type}
                label={label}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                margin='normal'
                variant='standard'
                fullWidth
                required
                size='small'
            />
        </Box>
    )
}

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};


export default Input;
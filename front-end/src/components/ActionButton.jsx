import { Button } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PropTypes from 'prop-types';

const ActionButton = ({ action }) => {
    return (
        <Button
            type="submit"
            endIcon=<ArrowRightIcon />
            sx={{
                background: "#7f7fef",
                color: "white",
                marginTop: "2px",
                fontSize: "0.75rem",
                "&:hover": {
                    background: "#2222e1",
                    color: "white",
                    marginTop: "2px",
                },
            }}>
            { action }
        </Button>
    )
}
ActionButton.propTypes = {
    action: PropTypes.string,
};

export default ActionButton
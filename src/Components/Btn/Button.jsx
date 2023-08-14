import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ type, text, onClick, sx, isDisable = false }) => {
  return (
    <button
      className={`button button-${type}`}
      onClick={onClick}
      style={sx}
      disabled={isDisable}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  sx: PropTypes.object,
  isDisable: PropTypes.bool,
};

export default Button;

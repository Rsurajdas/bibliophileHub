import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  type,
  variant,
  text,
  onClick,
  sx,
  isDisable = false,
  rounded,
  element,
}) => {
  return (
    <button
      type={type}
      className={`button button-${variant} ${rounded ? 'round' : null}`}
      onClick={onClick}
      style={sx}
      disabled={isDisable}
    >
      {text}
      {element}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  sx: PropTypes.object,
  isDisable: PropTypes.bool,
  rounded: PropTypes.bool,
  element: PropTypes.element,
};

export default Button;

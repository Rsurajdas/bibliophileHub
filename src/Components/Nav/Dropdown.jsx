import PropTypes from 'prop-types';

const Dropdown = ({ children }) => {
  return <ul className="custom-dropdown">{children}</ul>;
};

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Dropdown;

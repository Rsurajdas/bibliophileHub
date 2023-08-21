import PropTypes from 'prop-types';

const NavItems = ({ children }) => {
  return <ul className="nav-item">{children}</ul>;
};

NavItems.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default NavItems;

import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavList = ({ path, text }) => {
  return (
    <li className="nav-list">
      <NavLink to={path} className="nav-link">
        {text}
      </NavLink>
    </li>
  );
};

NavList.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
};

export default NavList;

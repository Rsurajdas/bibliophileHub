import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavList = ({ path, text }) => {
  return (
    <li className="nav-list">
      <Link to={path} className="nav-link">
        {text}
      </Link>
    </li>
  );
};

NavList.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
};

export default NavList;

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DropdownList = ({ path, text }) => {
  return (
    <li className="custom-dropdown-list">
      <Link to={path} className="custom-dropdown-link">
        {text}
      </Link>
    </li>
  );
};

DropdownList.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
};

export default DropdownList;

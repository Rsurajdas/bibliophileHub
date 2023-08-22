import PropTypes from 'prop-types';

const Grid = ({ sx, children }) => {
  return (
    <div className="grid" style={sx}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  sx: PropTypes.object,
};

export default Grid;

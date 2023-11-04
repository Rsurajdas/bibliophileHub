import PropTypes from 'prop-types';

const PostBtn = ({ sx, isShelved, setOpen, isFetching }) => {
  return (
    <div className="btn-wrapper" style={sx}>
      <button
        className="btn-custom"
        style={
          isShelved
            ? { backgroundColor: '#f2f2f2', color: '#2a2a2a' }
            : { backgroundColor: '#409d69', color: '#f4f4f4' }
        }
        onClick={() => setOpen(true)}
        disabled={isFetching}
      >
        {isShelved && !isFetching ? (
          <i className="fa-solid fa-check" style={{ color: '#409d69' }}></i>
        ) : null}{' '}
        {!isShelved ? 'Add to Shelves' : isFetching ? 'Adding...' : 'Added'}
      </button>
    </div>
  );
};

PostBtn.propTypes = {
  sx: PropTypes.object,
  bookId: PropTypes.string,
  isShelved: PropTypes.bool,
  setOpen: PropTypes.func,
  isFetching: PropTypes.bool,
};

export default PostBtn;

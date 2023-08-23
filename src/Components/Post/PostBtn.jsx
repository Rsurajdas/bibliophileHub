import { useState } from 'react';
import PropTypes from 'prop-types';

const PostBtn = ({ sx }) => {
  const [save, setSave] = useState(false);

  return (
    <div className="btn-wrapper" style={sx}>
      <button
        className="btn-custom"
        onClick={() => setSave((s) => !s)}
        style={
          save
            ? { backgroundColor: '#f2f2f2', color: '#2a2a2a' }
            : { backgroundColor: '#409d69', color: '#f4f4f4' }
        }
      >
        {save ? (
          <i className="fa-solid fa-check" style={{ color: '#409d69' }}></i>
        ) : null}{' '}
        Want to Read
      </button>
      <button className="btn-dropdown ">
        <i className="fa-solid fa-angle-down"></i>
      </button>
    </div>
  );
};

PostBtn.propTypes = {
  sx: PropTypes.object,
};

export default PostBtn;

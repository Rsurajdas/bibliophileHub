import { useState } from 'react';

const PostBtn = () => {
  const [save, setSave] = useState(false);

  return (
    <div className="btn-wrapper">
      <button
        className="btn-custom"
        onClick={() => setSave((s) => !s)}
        style={save ? { backgroundColor: '#f2f2f2', color: '#2a2a2a' } : {}}
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

export default PostBtn;

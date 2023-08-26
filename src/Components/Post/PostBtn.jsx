import { useState, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

const PostBtn = ({ sx, bookId }) => {
  const [save, setSave] = useState(false);
  const [shelves, setShelves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useRouteLoaderData('token');

  const fetchShelves = async () => {
    const res = await fetch('http://127.0.0.1:3000/api/v1/shelf', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setIsLoading(false);
    setShelves(data.data.shelves);
  };

  const handleToRead = async (book_id) => {
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/shelf/add-book/${shelves[2]._id}/${book_id}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    toast(data.message);
    if (!data.status === 'fail') setSave((s) => !s);
  };

  useEffect(() => {
    fetchShelves();
  }, []);

  return (
    <div className="btn-wrapper" style={sx}>
      <button
        className="btn-custom"
        onClick={() => handleToRead(bookId)}
        style={
          save
            ? { backgroundColor: '#f2f2f2', color: '#2a2a2a' }
            : { backgroundColor: '#409d69', color: '#f4f4f4' }
        }
      >
        {save ? (
          <i className="fa-solid fa-check" style={{ color: '#409d69' }}></i>
        ) : null}{' '}
        Add to Shelves
      </button>

      <ToastContainer position="bottom-left" />
    </div>
  );
};

PostBtn.propTypes = {
  sx: PropTypes.object,
  bookId: PropTypes.string,
};

export default PostBtn;

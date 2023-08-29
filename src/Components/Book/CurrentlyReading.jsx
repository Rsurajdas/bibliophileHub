import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography, Box } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './Book.css';
import Button from '../Btn/Button';
import 'react-toastify/dist/ReactToastify.css';

const CurrentlyReading = ({ book }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [readingProgress, setReadingProgress] = useState(book.readingProgress);
  const progressRef = useRef(null);
  const token = useRouteLoaderData('token');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleProgress = async (bookId) => {
    try {
      const readingProgressData = {
        readingProgress: Number(progressRef.current.value),
      };
      const res = await axios.patch(
        `http://127.0.0.1:3000/api/v1/shelf/update-progress/${bookId}`,
        readingProgressData,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const { data } = res;
      setReadingProgress(progressRef.current.value);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleFinish = async (bookId) => {
    try {
      const readingProgressData = {
        readingProgress: 100,
      };
      const res = await axios.patch(
        `http://127.0.0.1:3000/api/v1/shelf/update-progress/${bookId}`,
        readingProgressData,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const { data } = res;
      setReadingProgress(100);
      setAnchorEl(null);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="reading mb-3">
      <div className="reading-img">
        <img src={book.book.book_image} alt={book.book.title} />
      </div>
      <div className="reading-content">
        <h6>
          <Link to={`/book/${book.book._id}`} style={{ color: '#2a2a2a' }}>
            {book.book.title}
          </Link>
        </h6>
        <div className="mb-2">{book.book.author.name}</div>
        {readingProgress > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={Number(readingProgress)}
                color="success"
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                readingProgress
              )}/100%`}</Typography>
            </Box>
          </Box>
        )}
        <Button
          text="update progress"
          variant="outline"
          sx={{ fontSize: '12px', padding: '5px 15px', marginTop: '10px' }}
          onClick={handleClick}
        />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className="progress-wrapper">
          <div className="progress-top">
            <div className="progress-form">
              <div>
                <label htmlFor="reading">
                  Currently on
                  <input
                    type="number"
                    name="reading"
                    id="reading"
                    style={{
                      height: '25px',
                      width: '60px',
                      margin: '0 10px',
                      padding: '2px 5px',
                    }}
                    max={100}
                    min={0}
                    ref={progressRef}
                  />
                  <span>of 100%</span>
                </label>
                <Button
                  text="Update"
                  variant="solid"
                  sx={{
                    padding: '2px 7px',
                    fontSize: '12px',
                    marginLeft: '10px',
                  }}
                  onClick={() => handleProgress(book.book._id)}
                />
              </div>
            </div>
            <Button
              text="I'm finished"
              variant="text"
              onClick={() => handleFinish(book.book._id)}
            />
          </div>
          <div className="progress-footer"></div>
        </div>
      </Popover>
      <ToastContainer position="bottom-left" limit={1} />
    </div>
  );
};

CurrentlyReading.propTypes = {
  book: PropTypes.object,
  setOpen: PropTypes.func,
};

export default CurrentlyReading;

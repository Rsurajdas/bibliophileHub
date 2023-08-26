import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Button from '../Btn/Button';
import 'react-toastify/dist/ReactToastify.css';
import './../Form/Form.css';

const style = {
  gap: '5%',
};

const AddShelf = ({ setShelves }) => {
  const token = useRouteLoaderData('token');
  const shelfRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!shelfRef.current.value) {
        throw new Error('Shelf name cant be empty');
      }
      const shelfData = {
        shelf_name: shelfRef.current.value,
      };
      const res = await axios.post(
        'http://127.0.0.1:3000/api/v1/shelf',
        shelfData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { data } = res;
      setShelves((s) => [...s, data.data.shelf]);
      shelfRef.current.value = '';
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="d-flex align-items-end" style={style}>
        <input
          type="text"
          name="shelf"
          id="shelf"
          className="form-input"
          placeholder="Add shelf"
          ref={shelfRef}
        />
        <Button text="Add" variant="solid" type="submit" />
      </div>
      <ToastContainer position="bottom-left" />
    </form>
  );
};

AddShelf.propTypes = {
  setShelves: PropTypes.func,
};

export default AddShelf;

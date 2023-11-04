import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import '../Form/Form.css';
import '../Btn/Button.css';

const style = {
  gap: '5%',
};

const AddShelf = () => {
  const token = useRouteLoaderData('token');
  const shelfRef = useRef(null);
  const queryClient = useQueryClient();

  const { isLoading, mutate: handleSubmit } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      if (!shelfRef.current.value) {
        throw new Error('Shelf name cant be empty');
      }
      const shelfData = {
        shelf_name: shelfRef.current.value,
      };
      await axios.post(
        'https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/shelf',
        shelfData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      shelfRef.current.value = '';
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['shelves'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

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

        <button
          className="button button-solid"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>
      <ToastContainer position="bottom-left" />
    </form>
  );
};

// AddShelf.propTypes = {
//   setShelves: PropTypes.func,
// };

export default AddShelf;

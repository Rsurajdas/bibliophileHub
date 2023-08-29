import PropTypes from 'prop-types';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '../Btn/Button';

const SelectSelf = ({ shelves, setOpen, handleShelf, open }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        aria-labelledby="size-modal-title"
        aria-describedby="size-modal-description"
        size="sm"
      >
        <ModalClose />
        <div className="shelf-container">
          <h6 className="mb-4">Choose a shelf for this book</h6>
          <Select placeholder="Choose a shelf" onChange={handleShelf}>
            {shelves &&
              shelves.map((shelf) => (
                <Option value={shelf._id} key={shelf._id}>
                  {shelf.shelf_name}
                </Option>
              ))}
          </Select>
          <Button
            text="Done"
            variant="outline"
            onClick={() => setOpen(false)}
            sx={{ marginTop: '10px' }}
          />
        </div>
      </ModalDialog>
    </Modal>
  );
};

SelectSelf.propTypes = {
  open: PropTypes.bool,
  shelves: PropTypes.array,
  setOpen: PropTypes.func,
  handleShelf: PropTypes.func,
};

export default SelectSelf;

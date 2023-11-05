import PropTypes from 'prop-types';
import Button from '../Btn/Button';
import { useShelves } from '../../hooks/useShelves';
import { Modal, Select } from 'antd';

const SelectSelf = ({ setOpen, handleShelf, open, loading }) => {
  const { shelves } = useShelves();

  return (
    <>
      <Modal
        title="Choose a shelf for this book"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button
            key={'close'}
            text={loading ? 'Loading...' : 'Done'}
            variant="outline"
            onClick={() => setOpen(false)}
            sx={{ marginTop: '10px' }}
            isDisable={loading}
          />,
        ]}
      >
        <div className="shelf-container">
          <Select
            placeholder="Select a Shelf"
            style={{
              width: '100%',
            }}
            onChange={(e) => handleShelf({ id: e })}
            options={shelves?.map((shelf) => {
              return { value: shelf._id, label: shelf.shelf_name };
            })}
          />
        </div>
      </Modal>
    </>
  );
};

SelectSelf.propTypes = {
  open: PropTypes.bool,
  loading: PropTypes.bool,
  setOpen: PropTypes.func,
  handleShelf: PropTypes.func,
};

export default SelectSelf;

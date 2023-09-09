import PropTypes from 'prop-types';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './Form.css';

const FormInput = ({
  fieldName,
  type,
  name,
  id,
  rounded,
  message,
  placeHolder,
}) => {
  return (
    <>
      {fieldName && (
        <label htmlFor={name} className="form-label">
          {fieldName}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        className={`form-input ${rounded ? 'round' : null}`}
        placeholder={placeHolder}
      />
      {message && (
        <small style={{ color: '#f00', fontSize: '12px' }}>
          <InfoOutlinedIcon fontSize="small" /> {message}
        </small>
      )}
    </>
  );
};

FormInput.propTypes = {
  fieldName: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  rounded: PropTypes.bool,
  message: PropTypes.string,
  placeHolder: PropTypes.string,
};

export default FormInput;

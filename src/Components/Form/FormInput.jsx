import PropTypes from 'prop-types';
import './Form.css';

const FormInput = ({ fieldName, type, name, id, rounded }) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {fieldName}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className={`form-input ${rounded ? 'round' : null}`}
      />
    </>
  );
};

FormInput.propTypes = {
  fieldName: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  rounded: PropTypes.bool,
};

export default FormInput;

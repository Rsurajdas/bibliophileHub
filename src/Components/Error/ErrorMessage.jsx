import PropTypes from 'prop-types';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ErrorMessage = ({ message }) => {
  return (
    <div className="message mb-3">
      <div className="message-icon">
        <InfoOutlinedIcon />
      </div>
      <div className="message-detail text-left">
        <h4
          style={{
            fontSize: '17px',
            lineHeight: '1.255',
            color: '#1e1915',
            margin: 0,
          }}
        >
          There was a problem
        </h4>
        <div className="message-content">{message}</div>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;

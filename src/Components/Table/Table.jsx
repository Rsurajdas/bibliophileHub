import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import Button from '../Btn/Button';

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>cover</th>
          <th>title</th>
          <th>author</th>
          <th>date pub</th>
          <th>rating</th>
          <th>shelve</th>
          <th>review</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ width: '70px' }}>
            <div className="">
              <Link>
                <img
                  src="/images/9780375726262.jpg"
                  alt="cover image"
                  className="cover-img"
                />
              </Link>
            </div>
          </td>
          <td
            style={{
              width: '180px',
            }}
          >
            <div>The Silent Patient</div>
          </td>
          <td
            style={{
              width: '90px',
            }}
          >
            <div>Dadheech, puru</div>
          </td>
          <td
            style={{
              width: '90px',
            }}
          >
            <div>July 23, 2021</div>
          </td>
          <td
            style={{
              width: '100px',
            }}
          >
            <Rating name="book-rating" defaultValue={2.5} size="small" />
          </td>
          <td
            style={{
              width: '90px',
            }}
          >
            <Link to="/">to-read</Link>
          </td>
          <td>
            <Link to="/">Write Review</Link>
          </td>
          <td>
            <Button variant="text" text="X" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.object,
};

export default Table;

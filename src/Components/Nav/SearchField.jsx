import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import './Search.css';

const SearchField = ({ sx }) => {
  const searchRef = useRef(null);
  const [results, setResults] = useState([]);

  const fetchSearchResult = async () => {
    const res = await fetch(
      `https://boiling-wildwood-46640-30ec30629e36.herokuapp.com/api/v1/books/search?title=${searchRef.current.value.toUpperCase()}`
    );
    const data = await res.json();
    setResults(data.data.books);
  };
  return (
    <div className="search-wrapper">
      <form className="search-form" style={sx}>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search Books"
            ref={searchRef}
            onChange={fetchSearchResult}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
      <ul className="search-result">
        {results &&
          searchRef.current?.value &&
          results.map((data) => (
            <li key={data._id}>
              <a href={`/book/${data._id}`}>
                <div className="search-img">
                  <img src={data.book_image} alt="book cover" />
                </div>
                <div className="search-content">
                  <h5>{data.title}</h5>
                  <div className="">By {data.author.name}</div>
                </div>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

SearchField.propTypes = {
  sx: PropTypes.object,
};

export default SearchField;

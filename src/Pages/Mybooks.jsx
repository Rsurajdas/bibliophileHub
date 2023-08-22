import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchField from '../Components/Nav/SearchField';
import MenuIcon from '@mui/icons-material/Menu';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Button from '../Components/Btn/Button';
import { Link } from 'react-router-dom';
import './../Components/Btn/Button.css';
import Table from '../Components/Table/Table';
import Grid from '../Components/Layout/Grid';

const MyBooks = () => {
  const [showTable, setShowTable] = useState(true);

  return (
    <main>
      <section>
        <Container>
          <Row className="align-items-center border-bottom pt-3 pb-2">
            <Col md={6}>
              <div className="section-header">
                <h1
                  style={{
                    fontSize: '25px',
                    lineHeight: '26px',
                    fontWeight: 600,
                    color: '#282',
                  }}
                >
                  My Books
                </h1>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex gx-2 justify-content-end">
                <SearchField sx={{ width: '250px', fontSize: '13px' }} />
                <Button
                  sx={{ padding: '5px' }}
                  element={<MenuIcon />}
                  onClick={() => {
                    setShowTable(true);
                  }}
                />
                <Button
                  sx={{ padding: '5px' }}
                  element={<WidgetsIcon />}
                  onClick={() => {
                    setShowTable(false);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={3}>
              <div className="book-shelf border-bottom">
                <h4>
                  BookShelves <Link to="/">Edit</Link>
                </h4>
                <ul>
                  <li>
                    <Button className="button" variant="text" text="All" />
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={9}>
              {showTable ? (
                <div className="book-table">
                  <Table />
                </div>
              ) : (
                <div className="book-grid">
                  <Grid
                    sx={{
                      gridTemplateColumns: 'repeat(7, 120px)',
                      gridGap: '2.1%',
                    }}
                  >
                    <div className="item">
                      <div className="item-img">
                        <Link to="/">
                          <img
                            src="/images/9780375726262.jpg"
                            alt="book cover"
                          />
                        </Link>
                      </div>
                      <Link to="/edit" className="float-link">
                        edit
                      </Link>
                    </div>
                  </Grid>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default MyBooks;

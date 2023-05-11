import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Footer() {
  return (
    <Container>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top border-info" >
        <Col md={4} className="d-flex align-items-center">
          <a href="https://google.com/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <i className="bi bi-bootstrap" style={{ "fontSize": "1.5rem" }}></i>
          </a>
          <span className="mb-3 mb-md-0 text-muted">2023, linkliti</span>
        </Col>
        <Col md={4} className="d-flex justify-content-end">
          <Row className="nav list-unstyled d-flex">
            <Col className="ms-3">
              <a className="text-muted" href="https://github.com/linkliti">
                <i className="bi bi-github" style={{ "fontSize": "1.5rem" }}></i>
              </a>
            </Col>
          </Row>
        </Col>
      </footer>
    </Container>
  );
}

export default Footer;
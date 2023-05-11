import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from '../basePage/NavLink';

function Hero() {
  return (
    <Container className="col-xxl-8 px-4 py-5">
      <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
        <Col xs={10} sm={8} lg={6}>
        </Col>
        <Col lg={6}>
          <h1 className="display-5 fw-bold lh-1 mb-3">
            Random Data Generator
          </h1>
          <p className="lead">
            Проект направленный на создание случайных данных.
          </p>
          <Container className="gap-2 d-md-flex justify-content-md-start">
              <Link className="btn btn-lg px-4 me-2 btn-primary" text="Перейти к генератору" href="/generator"/>
          </Container >
        </Col>
      </Row>
    </Container>
  );
}

export default Hero;
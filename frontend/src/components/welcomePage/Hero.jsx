import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, Button } from "react-bootstrap";

function Hero() {
  return (
    <Container className="col-xxl-8 px-4 py-5">
      <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
        <Col xs={10} sm={8} lg={6}></Col>
        <Col lg={6}>
          <h1 className="display-5 fw-bold lh-1 mb-3">Random Data Generator</h1>
          <p className="lead">
            Проект направленный на создание случайных данных.
          </p>
          <Container className="gap-2 d-md-flex justify-content-md-start">
            <NavItem>
              <Nav.Link as={NavLink} to="/generator/default">
                <Button className="btn-lg">Перейти к генератору</Button>
              </Nav.Link>
            </NavItem>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Hero;

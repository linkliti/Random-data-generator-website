import { useContext } from "react";
import { Button, Col, Container, Nav, NavItem, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Context } from "../..";
import HeroAuthorised from "./HeroAuthorised";
import { observer } from "mobx-react-lite";

const Hero = observer(() => {
  const { user } = useContext(Context);

  return (
    <Container fluid="xxl" className="px-4 py-5">
      <Row className="flex-lg-row align-items-center g-5 py-5">
        <Col xs={10} sm={8} lg={6}>
          <h1 className="display-5 fw-bold lh-1 mb-3">Random Data Generator</h1>
          <p className="lead">
            Самый функциональный онлайн генератор случайных данных, работающий с помощью библиотеки Faker.
          </p>
          <Container className="gap-2 d-md-flex justify-content-md-start">
            <NavItem>
              <Nav.Link as={NavLink} to="/generator/default/1">
                <Button className="btn-lg">Перейти к генератору</Button>
              </Nav.Link>
            </NavItem>
          </Container>
        </Col>
        <Col lg={6}>{user.isAuth ? <HeroAuthorised /> : <></>}</Col>
      </Row>
    </Container>
  );
})

export default Hero;

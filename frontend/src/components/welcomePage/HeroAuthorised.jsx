import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "../..";

function HeroAuthorised() {
  const { user } = useContext(Context);

  return (
    <Container>
      <h1>Главная</h1>
      <Row>
        <Col>
          <h2>Профиль</h2>
          <p>Имя: {user.user.displayName} </p>
          <p>Почта: {user.user.userPrincipalName} </p>
        </Col>
      </Row>
    </Container>
  );
}

export default HeroAuthorised;

import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "../..";

function HeroAuthorised() {
  const { user } = useContext(Context);

  return (
    <Container>
      <h1>Добро пожаловать</h1>
      <h4 className="mt-4">Имя: {user.user.displayName} </h4>
      <h4>Почта: {user.user.userPrincipalName} </h4>
    </Container>
  );
}

export default HeroAuthorised;

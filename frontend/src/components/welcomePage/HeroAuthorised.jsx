
import { Container, Row, Col } from 'react-bootstrap';
function HeroAuthorised(props) {
  const user = props.user;
  return (
    <Container>
      <h1>Главная</h1>
      <Row>
        <Col>
          <h2>Профиль</h2>
          <p>Имя: {user.displayName} </p>
          <p>Почта: {user.userPrincipalName} </p>
        </Col>
      </Row>
    </Container>
  );
}

export default HeroAuthorised;
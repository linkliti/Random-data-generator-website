import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Context } from "../..";
import { Link } from "./NavLink";
import { SignInButton } from "./signButtons/SignInButton";
import { SignOutButton } from "./signButtons/SignOutButton";

const Header = observer((props) => {
  var links = props.links;
  var linkItems = [];
  const { user } = useContext(Context);

  for (let i = 0; i < links.length; i++) {
    // "as={NavLink} to=" instead of "href" for no page refresh
    // 'react-router-bootstrap' is not required
    linkItems.push(<Link text={links[i].text} href={links[i].url} />);
  }
  return (
    <>
      <Navbar variant="dark" expand="lg" className="shadow-lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            RDG
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">{linkItems}</Nav>
            {user.isAuth ? <SignOutButton /> : <SignInButton />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
});

export default Header;

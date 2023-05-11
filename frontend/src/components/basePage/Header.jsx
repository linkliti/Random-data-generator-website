import { Navbar, Nav, Container } from 'react-bootstrap';
import React from 'react';
import { SignInButton } from './signButtons/SignInButton';
import { SignOutButton } from './signButtons/SignOutButton';
import { Link } from './NavLink';
import { NavLink } from "react-router-dom";

function Header(props) {
  var links = props.links;
  var email = props.email;
  var linkItems = [];

  for (let i = 0; i < links.length; i++) {
    // "as={NavLink} to=" instead of "href" for no page refresh
    // 'react-router-bootstrap' is not required
    linkItems.push(
      <Link text={links[i].text} href={links[i].url}/>
    );
  }
  return (
    <>
      <Navbar variant="dark" expand="lg" className='shadow-lg'>
        <Container>
          <Navbar.Brand as={NavLink} to="/">RDG</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {linkItems}
            </Nav>
          {email ? <SignOutButton email={email} /> : <SignInButton />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
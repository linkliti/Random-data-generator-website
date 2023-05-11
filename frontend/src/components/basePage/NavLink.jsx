import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "react-bootstrap";

export const Link = (props) => {
  var { text, href, ...props } = props;
  return (
    <NavItem {...props}>
      <Nav.Link as={NavLink} to={href}>
        {text}
      </Nav.Link>
    </NavItem>
  );
}
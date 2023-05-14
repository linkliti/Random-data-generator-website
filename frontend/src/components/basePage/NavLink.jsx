import { Nav, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const Link = (props) => {
  // eslint-disable-next-line
  var { text, href, ...otherProps } = props;

  return (
    <NavItem {...otherProps}>
      <Nav.Link as={NavLink} to={href}>
        {text}
      </Nav.Link>
    </NavItem>
  );
};

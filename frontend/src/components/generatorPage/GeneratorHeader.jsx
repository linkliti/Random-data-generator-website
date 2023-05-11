import { Container, Nav, Navbar, NavItem } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { Link } from '../basePage/NavLink';

function DialogItem(props) {
  let path = props.id;
  return (
    <NavLink to={path}>{props.name}</NavLink>
  );
}

export const GeneratorHeader = (props) => {
  let isAuthorised = props.isAuthorised;
  return (
    <>
      <Nav variant="tabs" defaultActiveKey="1">
        <Link text={"Временная"} href={"default"} />
        {isAuthorised ? <>
          <Link text={"Сохранение 1"} href={"save/1"} />
          <Link text={"Сохранение 2"} href={"save/2"} />
          <Link text={"Сохранение 3"} href={"save/3"} />
        </>
          : <p className='text-secondary tab-text user-select-none'>Войдите для использования сохранений</p>
        }
      </Nav>
    </>
  )
}
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Nav } from "react-bootstrap";
import { Context } from "../..";
import { Link } from "../basePage/NavLink";

/*
function DialogItem(props) {
  let path = props.id;
  return (
    <NavLink to={path}>{props.name}</NavLink>
  );
}
*/
export const GeneratorHeader = observer(() => {
  const { user } = useContext(Context);
  return (
    <>
      <Nav variant="tabs" defaultActiveKey="1">
        <Link text={"Временная"} href={"default"} />
        {user.isAuth ? (
          <>
            <Link text={"Сохранение 1"} href={"save/1"} />
            <Link text={"Сохранение 2"} href={"save/2"} />
            <Link text={"Сохранение 3"} href={"save/3"} />
          </>
        ) : (
          <p className="text-secondary tab-text user-select-none">
            Войдите для использования сохранений
          </p>
        )}
      </Nav>
    </>
  );
});

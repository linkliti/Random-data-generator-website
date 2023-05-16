import { observer } from "mobx-react-lite";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Context } from "../../..";

export const SignOutButton = observer(() => {
  const { user } = useContext(Context);

  var email = user.user.userPrincipalName;

  const handleLogout = () => {
    window.open(`${process.env.REACT_APP_API_URL}auth/logout`, "_self");
  };

  return (
    <Button
      variant="secondary"
      className="ml-auto"
      onClick={() => handleLogout()}
    >
      Выход ({email})
    </Button>
  );
});

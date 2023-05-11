
import Button from "react-bootstrap/Button";

export const SignOutButton = (props) => {
  var email = props.email;

  const handleLogout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  return (
    <Button variant="secondary" className="ml-auto" onClick={() => handleLogout()}>Выход ({email})</Button>
  );
}
import Button from "react-bootstrap/Button";

export const SignInButton = () => {

  const handleLogin = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/microsoft/callback`,
      "_self"
    );
  };

  return (
    <Button variant="primary" className="ml-auto" onClick={() => handleLogin()}>Вход с помощью Microsoft</Button>
  );
}
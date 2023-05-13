import axios from "axios";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Context } from ".";
import "./assets/bootstrap.scss";
import Footer from "./components/basePage/Footer";
import Header from "./components/basePage/Header";
import MainRoutes from "./routes/MainRoutes";

const App = observer(() => {
  const HeaderLinks = [{ text: "Генератор", url: "/generator" }];

  const { user } = useContext(Context);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      user.setUser(data.user._json);
      user.setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  });

  // Empty container used for sticky footer
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header links={HeaderLinks} />
      <Container className="mt-4">
        <MainRoutes />
      </Container>
      <Container className="flex-grow-1"></Container>
      <Footer />
    </div>
  );
});

export default App;

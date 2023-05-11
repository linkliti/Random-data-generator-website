import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import './assets/bootstrap.scss';
import Footer from './components/basePage/Footer';
import Header from './components/basePage/Header';
import MainRoutes from './routes/MainRoutes';

function App() {
  const HeaderLinks = [
    { text: "Конвертер", url: "/converter" },
  ];

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  var isAuthorised = (user != null);

  // Empty container used for sticky footer
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header links={HeaderLinks} email={isAuthorised ? user.userPrincipalName : false} />
      <Container className="mt-4">
        <MainRoutes user={isAuthorised ? user : false} />
      </Container>
      <Container className='flex-grow-1'>
      </Container>
      <Footer />
    </div>
  );
}


export default App;

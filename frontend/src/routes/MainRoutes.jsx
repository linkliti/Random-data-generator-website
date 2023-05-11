import { Route, Routes } from "react-router-dom";
import HeroAuthorised from "../components/welcomePage/HeroAuthorised";
import Hero from "../components/welcomePage/Hero";
import Generator from "../components/generatorPage/Generator";
import NotFound from "../components/basePage/NotFound";

export const MainRoutes = (props) => {
  let isAuthorised = props.user ? true : false;
  return (
    <Routes>
      <Route exact path="/" element={props.user
        ? <HeroAuthorised user={props.user} />
        : <Hero />}
      />
      <Route exact path="/generator/*" element={<Generator isAuthorised={isAuthorised}/>} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default MainRoutes;
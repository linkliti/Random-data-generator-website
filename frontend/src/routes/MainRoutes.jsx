import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Context } from "..";
import NotFound from "../components/basePage/NotFound";
import { Generator } from "../components/generatorPage/Generator";
import Hero from "../components/welcomePage/Hero";
import HeroAuthorised from "../components/welcomePage/HeroAuthorised";
import FakerDoc from "../components/docPage/FakerDoc";

export const MainRoutes = observer(() => {
  const { user } = useContext(Context);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={user.isAuth ? <HeroAuthorised /> : <Hero />}
      />
      <Route exact path="/doc" element={<FakerDoc />} />
      <Route exact path="/generator/*" element={<Generator />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
});

export default MainRoutes;

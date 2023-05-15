import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/basePage/NotFound";
import { Generator } from "../components/generatorPage/Generator";
import Hero from "../components/welcomePage/Hero";
import FakerDoc from "../components/docPage/FakerDoc";

export const MainRoutes = observer(() => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Hero />}
      />
      <Route exact path="/doc" element={<FakerDoc />} />
      <Route exact path="/generator/*" element={<Generator />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
});

export default MainRoutes;

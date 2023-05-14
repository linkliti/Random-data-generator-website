import { Route, Routes } from "react-router-dom";
import { GeneratorHeader } from "./GeneratorHeader";
import { GeneratorOptions } from "./GeneratorOptions";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import axios from "axios";

export const Generator = observer(() => {
  const { user } = useContext(Context);

  async function getGenOptions() {
    if (!user.options) {
      const { data } = await axios.get(
        "http://localhost:3001/generator/options"
      );
      user.setOptions(data);
    }
  }
  useEffect(() => {
    getGenOptions();
  }, []);

  return (
    <>
      <GeneratorHeader />
      <Routes>
        <Route path="/default/1" element={<GeneratorOptions storeID="0" />} />
        <Route path="/default/2" element={<GeneratorOptions storeID="1" />} />
        <Route path="/save/1" element={<GeneratorOptions storeID="2" />} />
        <Route path="/save/2" element={<GeneratorOptions storeID="3" />} />
        <Route path="/save/3" element={<GeneratorOptions storeID="4" />} />
      </Routes>
    </>
  );
});

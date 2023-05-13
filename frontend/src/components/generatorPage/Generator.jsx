import { Route, Routes } from "react-router-dom";
import { GeneratorHeader } from "./GeneratorHeader";
import { GeneratorOptions } from "./GeneratorOptions";
import { GeneratorTable } from "./GeneratorTable";
import { useContext, useEffect, useState } from "react";
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
    <Routes>
      <Route
        path="*"
        element={
          <>
            <GeneratorHeader />
            <GeneratorOptions />
          </>
        }
      />
    </Routes>
  );
});

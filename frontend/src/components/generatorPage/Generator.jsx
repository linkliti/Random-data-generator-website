import { Route, Routes } from "react-router-dom";
import { GeneratorHeader } from "./GeneratorHeader";
import { GeneratorOptions } from "./GeneratorOptions";
import { GeneratorTable } from "./GeneratorTable";

function Generator() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <GeneratorHeader />
            <GeneratorOptions />
            <GeneratorTable />
          </>
        }
      />
    </Routes>
  );
}

export default Generator;

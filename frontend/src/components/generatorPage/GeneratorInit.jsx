import GeneratorStore from "../../store/GeneratorStore";
import { Generator } from "./Generator";
import { createContext } from "react";


export const GenContext = createContext(null);

export function GeneratorInit() {
  return (
    <GenContext.Provider
      value={{
        genOptions: new GeneratorStore(),
      }}
    >
      <Generator />
    </GenContext.Provider>
  );
}

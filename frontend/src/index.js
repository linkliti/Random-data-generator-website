import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UserStore from "./store/UserStore";
import GeneratorStore from "./store/GeneratorStore";

export const Context = createContext(null);
export const GenContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Context.Provider
      value={{
        user: new UserStore(),
      }}
    >
      <GenContext.Provider
        value={{
          genOpt: new GeneratorStore(),
        }}
      >
        <App />
      </GenContext.Provider>
    </Context.Provider>
  </BrowserRouter>
);

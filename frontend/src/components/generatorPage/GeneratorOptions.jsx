import React, { useEffect, useState } from "react";

export const GeneratorOptions = () => {
  let [options, setOptions] = useState(false);
  function getOptions() {
    fetch("http://localhost:3001/generator/options")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setOptions(data);
      });
  }
  useEffect(() => {
    getOptions();
  }, []);

  return (
    <>
      <p className="">{options}</p>
    </>
  );
};

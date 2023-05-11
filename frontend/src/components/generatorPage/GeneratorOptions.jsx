import React, { useState, useEffect } from 'react';

export const GeneratorOptions = (props) => {
  let [options, setOptions] = useState(false);
  function getOptions() {
    fetch('http://localhost:3001/generator/options')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setOptions(data);
      });
  }
  useEffect(() => {
    getOptions();
  }, []);

  return (
    <>
      <p className=''>{options}</p>
    </>
  )
}
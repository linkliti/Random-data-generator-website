import { GeneratorHeader } from "./GeneratorHeader"
import { GeneratorOptions } from "./GeneratorOptions"
import { GeneratorTable } from "./GeneratorTable"
import { Routes, Route } from 'react-router-dom';

function Generator(props) {
  return (
    <Routes>
      <Route path="*" element={
        <>
          <GeneratorHeader isAuthorised={props.isAuthorised}/>
          <GeneratorOptions />
          <GeneratorTable />
        </>
      } />
    </Routes>
  )
}

export default Generator;
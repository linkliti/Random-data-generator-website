import { ConvertHeader } from "./ConvertHeader"
import { ConvertOptions } from "./ConvertOptions"
import { ConvertTable } from "./ConvertTable"
import { Routes, Route } from 'react-router-dom';

function Converter(props) {
  return (
    <Routes>
      <Route path="*" element={
        <>
          <ConvertHeader isAuthorised={props.isAuthorised}/>
          <ConvertOptions />
          <ConvertTable />
        </>
      } />
    </Routes>
  )
}

export default Converter;
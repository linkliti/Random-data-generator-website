import { Button, Row, Col } from "react-bootstrap";
import { GenContext } from "../..";
import { useContext } from "react";
import { observer } from "mobx-react-lite";

export const GeneratorTable = observer((props) => {
  const storeID = props.storeID
  const { genOpt } = useContext(GenContext);
  function parseArr(arr) {
    if (
      (
        arr.includes("]")
      )
    ) {
      try {
      arr = JSON.parse(arr);
      } catch (e) {
        return 'Ошибка обработки JSON'
      }
      var separator = "";
      if (genOpt["Save" + storeID].outCommas) separator += ",";
      if (genOpt["Save" + storeID].outNewLine) separator += "\n";
      else separator += " ";
      if (genOpt["Save" + storeID].outWrap) {
        return '"' + arr.join('"' + separator + '"') + '"';
      } else return arr.join(separator);
    }
    else return arr;
  }

  return (
    <div className="mt-4">
      <Row className="mb-4">
        <Col className="col-2">
          <h4 className="mt-1">Результат:</h4>
        </Col>
        <Col>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                parseArr(genOpt["Save" + storeID].result)
              );
            }}
          >
            Копировать
          </Button>
        </Col>
      </Row>
      <div
        className="w-100 border rounded p-2 overflow-auto"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {parseArr(genOpt["Save" + storeID].result)}
      </div>
    </div>
  );
});

import { Button, Container, Row, Col } from "react-bootstrap";
import { GenContext } from "../..";
import { useContext } from "react";
import { observer } from "mobx-react-lite";

export const GeneratorTable = observer(() => {
  const { genOpt } = useContext(GenContext);
  var arr = genOpt.result;
  function parseArr(arr) {
    if (
      !(
        arr ===
        'Для появления результата заполните настройки и нажмите "Сгенерировать"'
      )
    ) {
      try {
      arr = JSON.parse(arr);
      } catch (e) {
        return 'Ошибка обработки JSON'
      }
      var separator = "";
      if (genOpt.outCommas) separator += ",";
      if (genOpt.outNewLine) separator += "\n";
      else separator += " ";
      if (genOpt.outWrap) {
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
              navigator.clipboard.writeText(parseArr(genOpt.result));
            }}
          >
            Копировать
          </Button>
        </Col>
      </Row>
      <div
        className="w-100 border rounded p-2 overflow-auto"
        style={{ "whiteSpace": "pre-wrap" }}
      >
        {parseArr(genOpt.result)}
      </div>
    </div>
  );
});

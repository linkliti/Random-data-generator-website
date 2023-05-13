import { Container } from "react-bootstrap";

export const GeneratorTable = (props) => {

  var text = props.text || 'Для появления результата заполните настройки и нажмите "Сгенерировать"'

  return (
    <div className="mt-4">
      <h4>Результат:</h4>
      <div className="w-100 border rounded p-2">{text}</div>
    </div>
  );
};

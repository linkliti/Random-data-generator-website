import { observer } from "mobx-react-lite";
import { GeneratorTable } from "./GeneratorTable";
import React, { useContext, useEffect } from "react";
import {
  ButtonGroup,
  Form,
  Ratio,
  ToggleButton,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Context, GenContext } from "../..";
import axios from "axios";
import locales from "./locales.json";

export const GeneratorOptions = observer((props) => {
  var hasUnsavedChanges = false;
  const storeID = props.storeID;
  const isUserSave = storeID >= 2 && storeID <= 4;
  const { user } = useContext(Context);
  const { genOpt } = useContext(GenContext);
  console.log("save ", genOpt["Save" + storeID]);
  var options = [];
  for (var key in user.options.message) {
    options.push({ value: key, label: key });
  }
  options.sort((a, b) => (a.label > b.label ? 1 : -1));

  const GeneratorFunctions = () => {
    return (
      <>
        <h4>Функции:</h4>
        <>
          <ButtonGroup className="d-flex flex-wrap">
            {user.options.message[genOpt["Save" + storeID].category].map(
              (value, idx) => (
                <ToggleButton
                  className="flex-grow-0 text-white"
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="outline-primary"
                  name="radio"
                  value={value}
                  checked={genOpt["Save" + storeID].func === value}
                  onChange={(e) => {
                    genOpt.setSave(storeID, "func", e.currentTarget.value);
                  }}
                >
                  {value}
                </ToggleButton>
              )
            )}
          </ButtonGroup>
        </>
      </>
    );
  };

  const GeneratorDocs = () => {
    // iframe with faker dock
    return (
      <>
        <h4>
          Описание{" "}
          {genOpt["Save" + storeID].category +
            "." +
            genOpt["Save" + storeID].func}
          :
        </h4>
        <Ratio aspectRatio={100} className="">
          <iframe
            title="documentation"
            src={`https://next.fakerjs.dev/api/${
              genOpt["Save" + storeID].category
            }.html#${genOpt["Save" + storeID].func.toLowerCase()}`}
          ></iframe>
        </Ratio>
      </>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const category = genOpt["Save" + storeID].category;
    const func = genOpt["Save" + storeID].func;
    const lang = data.get("lang");
    const seed = data.get("seed");
    const count = data.get("count");
    const params = data.get("params");
    const outNewLine = genOpt["Save" + storeID].outNewLine;
    const outCommas = genOpt["Save" + storeID].outCommas;
    const outWrap = genOpt["Save" + storeID].outWrap;
    const message = { category, func, lang, seed, count, params };
    console.log(message);
    await axios
      .post(process.env.REACT_APP_API_URL + "/generator/generate", message)
      .then((response) => {
        genOpt.setSave(storeID, "result", response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
    if (user.isAuth && isUserSave) {
      await axios
        .post(
          process.env.REACT_APP_API_URL + "/save/save",
          {
            storeID,
            category,
            func,
            lang,
            seed,
            count,
            params,
            outNewLine,
            outCommas,
            outWrap,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log("save result", response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const InputFields = observer(() => {
    // input fields for seed and parameters
    return (
      <Form onSubmit={handleSubmit} className="w-100 mt-4">
        <Form.Group className="mb-3" controlid="formLang">
          <Form.Label>Предпочитаемый язык</Form.Label>
          <Form.Select
            name="lang"
            value={genOpt["Save" + storeID].lang}
            onChange={(e) => {
              genOpt.setSave(storeID, "lang", e.target.value);
            }}
          >
            {Object.keys(locales).map((key) => (
              <option key={key} value={key}>
                {locales[key]}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlid="formSeed">
          <Form.Label>Сид случайности</Form.Label>
          <Form.Control
            name="seed"
            value={genOpt["Save" + storeID].seed}
            autoComplete="off"
            type="number"
            placeholder="Сид (необязательно)"
            onChange={(e) => {
              genOpt.setSave(storeID, "seed", e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlid="formCount">
          <Form.Label>Количество записей</Form.Label>
          <Form.Control
            name="count"
            value={genOpt["Save" + storeID].count}
            autoComplete="off"
            type="number"
            placeholder="Количество"
            required
            min="1"
            max="1000"
            onChange={(e) => {
              genOpt.setSave(storeID, "count", e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlid="formParams">
          <Form.Label>
            Параметры (для параметров и элементов массивов нужно использовать
            двойные кавычки)
          </Form.Label>
          <Form.Control
            name="params"
            value={genOpt["Save" + storeID].params}
            autoComplete="off"
            type="text"
            placeholder="Параметры из документации (необязательно)"
            onChange={(e) => {
              genOpt.setSave(storeID, "params", e.target.value);
            }}
          />
        </Form.Group>
        <Row>
          <Col className="col-lg-5 col-md-4 col-sm-6 mt-3">
            <Button
              className="w-100"
              variant="primary"
              disabled={
                !genOpt["Save" + storeID].func ||
                !genOpt["Save" + storeID].category
              }
              type="submit"
            >
              Сгенерировать
            </Button>
            {genOpt["Save" + storeID].func ? (
              <p className="mt-2">
                Выбранная функция:{" "}
                {genOpt["Save" + storeID].category +
                  "." +
                  genOpt["Save" + storeID].func}
              </p>
            ) : (
              <p className="mt-2">Функция не выбрана</p>
            )}
          </Col>
          <Col className="px-0 my-auto">
            <Form.Check
              className="mb-3"
              controlid="formOutNewLine"
              name="outnewline"
              label="Разделять новыми строками"
              type="switch"
              checked={genOpt["Save" + storeID].outNewLine}
              inline
              onChange={(e) => {
                genOpt.setSave(storeID, "outNewLine", e.target.checked);
              }}
            />
            <Form.Check
              className="mb-3"
              controlid="formOutCommas"
              name="outcommas"
              label="Запятые на конце"
              type="switch"
              checked={genOpt["Save" + storeID].outCommas}
              inline
              onChange={(e) => {
                genOpt.setSave(storeID, "outCommas", e.target.checked);
              }}
            />
            <Form.Check
              className="mb-3"
              controlid="formOutWrap"
              name="outwrap"
              label="Обернуть в кавычки"
              type="switch"
              checked={genOpt["Save" + storeID].outWrap}
              inline
              onChange={(e) => {
                genOpt.setSave(storeID, "outWrap", e.target.checked);
              }}
            />
          </Col>
        </Row>
      </Form>
    );
  });

  return (
    <>
      <Row>
        <Col className="col-lg-6 col-md-12 col-sm-12 mt-4 ">
          {isUserSave ? (
            <p>Для сохранения настроек необходимо сгенерировать данные</p>
          ) : (
            <p></p>
          )}
          <div className="d-flex align-items-center">
            <h4>Категория:</h4>
            <Form.Select
              className="form-select ms-4"
              value={genOpt["Save" + storeID].category || "none"}
              onChange={(e) => {
                genOpt.setSave(storeID, "category", e.target.value);
                genOpt.setSave(storeID, "func", false);
              }}
            >
              <option value="none" disabled hidden>
                Выберите категорию
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </div>
          {!genOpt["Save" + storeID].category ? (
            <></>
          ) : (
            <>
              <GeneratorFunctions />
              <InputFields />
            </>
          )}
        </Col>
        <Col className="mt-4 col-lg-6 col-md-12 col-sm-12">
          {!genOpt["Save" + storeID].func ? <></> : <GeneratorDocs />}
        </Col>
      </Row>
      <GeneratorTable storeID={storeID} />
    </>
  );
});

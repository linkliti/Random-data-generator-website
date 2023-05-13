import { observer } from "mobx-react-lite";
import { GeneratorTable } from "./GeneratorTable";
import React, { useContext, useEffect, useState } from "react";
import {
  ButtonGroup,
  Container,
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

export const GeneratorOptions = observer(() => {
  const { user } = useContext(Context);
  const { genOpt } = useContext(GenContext);
  const TableText = '';

  var msg = user.options.message;
  var options = [];

  for (var key in msg) {
    options.push({ value: key, label: key });
  }
  options.sort((a, b) => (a.label > b.label ? 1 : -1));

  const GeneratorFunctions = () => {
    return (
      <>
        <h4>Функции:</h4>
        <>
          <ButtonGroup className="d-flex flex-wrap">
            {msg[genOpt.category].map((value, idx) => (
              <ToggleButton
                className="flex-grow-0 text-white"
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="outline-primary"
                name="radio"
                value={value}
                checked={genOpt.func === value}
                onChange={(e) => genOpt.setFunc(e.currentTarget.value)}
              >
                {value}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </>
      </>
    );
  };

  const GeneratorDocs = () => {
    // iframe with faker dock
    return (
      <>
        <h4>Описание {genOpt.category + "." + genOpt.func}:</h4>
        <Ratio aspectRatio={100} className="">
          <iframe
            title="documentation"
            src={`https://fakerjs.dev/api/${
              genOpt.category
            }.html#${genOpt.func.toLowerCase()}`}
          ></iframe>
        </Ratio>
      </>
    );
  };

  const handleSubmit = (e) => {
    // log data
    e.preventDefault();

    const data = new FormData(e.target);
    const lang = data.get("formLang");
    const seed = data.get("formSeed");
    const count = data.get("formCount");
    const params = data.get("formParams");
    axios
      .post("http://localhost:3001", { lang, seed, count, params })
      .then((response) => {
        console.log(response.data);
        TableText = response.data.message;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const InputFields = observer(() => {
    // input fields for seed and parameters
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formLang">
          <Form.Label>Предпочитаемый язык</Form.Label>
          <Form.Select
            defaultValue={genOpt.lang}
            onChange={(e) => {
              genOpt.setLang(e.target.value);
            }}
          >
            {Object.keys(locales).map((key) => (
              <option key={key} value={key}>
                {locales[key]}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSeed">
          <Form.Label>Сид случайности</Form.Label>
          <Form.Control
            value={genOpt.seed}
            autoComplete="off"
            type="number"
            placeholder="Сид (необязательно)"
            onChange={(e) => {
              genOpt.setSeed(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCount">
          <Form.Label>Количество записей</Form.Label>
          <Form.Control
            value={genOpt.count}
            autoComplete="off"
            type="number"
            placeholder="Количество"
            required
            min="1"
            max="1000"
            onChange={(e) => {
              genOpt.setCount(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formParams">
          <Form.Label>Параметры</Form.Label>
          <Form.Control
            value={genOpt.params}
            autoComplete="off"
            type="text"
            placeholder="Параметры из документации (необязательно)"
            onChange={(e) => {
              genOpt.setParams(e.target.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Сгенерировать
        </Button>
      </Form>
    );
  });

  return (
    <>
    <Row>
      <Col className="col-lg-6 col-md-12 col-sm-12 mt-4 ">
        <div className="d-flex align-items-center">
          <h4>Категория:</h4>
          <Form.Select
            className="form-select ms-4"
            defaultValue={genOpt.category}
            onChange={(e) => {
              genOpt.setCategory(e.target.value);
              genOpt.setFunc();
            }}
          >
            <option value="none" selected disabled hidden>
              Выберите категорию
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </div>
        {!genOpt.category ? (
          <></>
        ) : (
          <>
            <GeneratorFunctions />
            <p className="mt-2">
              {" "}
              Выбранная функция: {genOpt.category + "." + genOpt.func}
            </p>
            <InputFields />
          </>
        )}
      </Col>
      <Col className="mt-4 col-lg-6 col-md-12 col-sm-12">
        {!genOpt.func ? <></> : <GeneratorDocs />}
      </Col>
    </Row>
    <GeneratorTable text={TableText} />
    </>
  );
});

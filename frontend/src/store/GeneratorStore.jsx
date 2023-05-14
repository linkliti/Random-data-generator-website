import { makeAutoObservable } from "mobx";

export default class GeneratorStore {
  constructor() {
    this._Save0 = {
      category: "",
      func: "",
      lang: "ru",
      seed: "",
      count: "1",
      params: "",
      result:
        'Для появления результата заполните настройки и нажмите "Сгенерировать"',
      outNewLine: true,
      outCommas: false,
      outWrap: false,
    };
    this._Save1 = { ...this._Save0 };
    this._Save2 = { ...this._Save0 };
    this._Save3 = { ...this._Save0 };
    this._Save4 = { ...this._Save0 };

    makeAutoObservable(this);
  }

  setSave(id, param, data) {
    this["_Save" + id][param] = data;
  }

  get Save0() {
    return this._Save0;
  }
  get Save1() {
    return this._Save1;
  }
  get Save2() {
    return this._Save2;
  }
  get Save3() {
    return this._Save3;
  }
  get Save4() {
    return this._Save3;
  }
}

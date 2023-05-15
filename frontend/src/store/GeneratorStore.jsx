import { makeAutoObservable } from "mobx";

const ResultTemplate = 'Для появления результата заполните настройки и нажмите "Сгенерировать"'

export default class GeneratorStore {
  constructor() {
    this._Save0 = {
      category: "",
      func: "",
      lang: "ru",
      seed: "",
      count: "1",
      params: "",
      result: ResultTemplate,
      outNewLine: true,
      outCommas: false,
      outWrap: false,
    };
    this._Save0 = { ...this._Save0, storeID:0 };
    this._Save1 = { ...this._Save0, storeID:1 };
    this._Save2 = { ...this._Save0, storeID:2 };
    this._Save3 = { ...this._Save0, storeID:3 };
    this._Save4 = { ...this._Save0, storeID:4 };

    makeAutoObservable(this);
  }

  setFullSave(data) {
    this._Save2 = { ...data.save1, result: ResultTemplate};
    this._Save3 = { ...data.save2, result: ResultTemplate};
    this._Save4 = { ...data.save3, result: ResultTemplate};
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
    return this._Save4;
  }
}

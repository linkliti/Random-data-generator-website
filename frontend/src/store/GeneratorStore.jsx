import { makeAutoObservable } from "mobx";

export default class GeneratorStore {
  constructor() {
    this._category = '';
    this._func = '';
    this._lang = 'ru';
    this._seed = '';
    this._count= '1';
    this._params = '';
    this._result = 'Для появления результата заполните настройки и нажмите "Сгенерировать"';
    this._outNewLine = true;
    this._outCommas = false;
    this._outWrap = false;
    makeAutoObservable(this);
  }

  setCategory(data) {
    this._category = data;
  }
  get category() {
    return this._category;
  }
  setFunc(data) {
    this._func = data;
  }
  get func() {
    return this._func;
  }
  setLang(data) {
    this._lang = data;
  }
  get lang() {
    return this._lang;
  }
  setSeed(data) {
    this._seed = data;
  }
  get seed() {
    return this._seed;
  }
  setCount(data) {
    this._count = data;
  }
  get count() {
    return this._count;
  }
  setParams(data) {
    this._params = data;
  }
  get params() {
    return this._params;
  }
  setResult(data) {
    this._result = data;
  }
  get result() {
    return this._result;
  }
  setOutNewLine(data) {
    this._outNewLine = data;
  }
  get outNewLine() {
    return this._outNewLine;
  }
  setOutCommas(data) {
    this._outCommas = data;
  }
  get outCommas() {
    return this._outCommas;
  }
  setOutWrap(data) {
    this._outWrap = data;
  }
  get outWrap() {
    return this._outWrap;
  }
}

export default class Ficha {
  constructor(exercicio, numero, carga, series, repeticoes) {
    this._exercicio = exercicio;
    this._numero = numero;
    this._carga = carga;
    this._series = series;
    this._repeticoes = repeticoes;
  }
  get exercicio() {
    return this._exercicio;
  }
  get numero() {
    return this._numero;
  }
  get carga() {
    return this._carga;
  }
  get series() {
    return this._series;
  }
  get repeticoes() {
    return this._repeticoes;
  }
}

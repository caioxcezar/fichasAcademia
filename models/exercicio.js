export default class Exercicio {
  constructor(nome, numero, carga, series, repeticoes) {
    this._nome = nome;
    this._numero = numero;
    this._carga = carga;
    this._series = series;
    this._repeticoes = repeticoes;
  }
  get nome() {
    return this._nome;
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

export default class Exercicio {
  constructor(nome, numero, carga, series, repeticoes, cod) {
    this._nome = nome;
    this._numero = numero;
    this._carga = carga;
    this._series = series;
    this._repeticoes = repeticoes;
    this._cod = cod;
  }
  set cod(value) {
    this._cod = value;
  }
  get cod() {
    return this._cod;
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

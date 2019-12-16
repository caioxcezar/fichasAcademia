import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import Exercicio from "../../models/exercicio";
import styles from "./styles";
import { TextInput } from "react-native-gesture-handler";

export default class CardExercicio extends React.Component {
  state = {
    nome: "",
    numero: "",
    carga: "",
    series: "",
    repeticoes: "",
    btnNome: "Salvar",
    key: -1
  };
  componentDidMount() {
    let exercicios = this.props.navigation.getParam("exercicios");
    let key = this.props.navigation.getParam("key", -1);
    if (key != -1) {
      this.setState({
        btnNome: "Editar",
        nome: exercicios[key].nome,
        numero: exercicios[key].numero,
        carga: exercicios[key].carga,
        series: exercicios[key].series,
        repeticoes: exercicios[key].repeticoes,
        key
      });
    }
  }
  render() {
    return (
      <View style={styles.exercicio}>
        <Text>Nome Exercicio:</Text>
        <TextInput
          onChangeText={text => this.setState({ nome: text })}
          style={styles.input}
          value={this.state.nome}
        />
        <Text>Nº:</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={text =>
            this.setState({
              numero: this.checkNumber(text)
            })
          }
          style={styles.input}
          value={this.state.numero}
        />
        <Text>Carga:</Text>
        <TextInput
          onChangeText={text => this.setState({ carga: text })}
          style={styles.input}
          value={this.state.carga}
        />
        <Text>Series:</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={text =>
            this.setState({
              series: this.checkNumber(text)
            })
          }
          style={styles.input}
          value={this.state.series}
        />
        <Text>Repetições:</Text>
        <TextInput
          onChangeText={text => this.setState({ repeticoes: text })}
          style={styles.input}
          value={this.state.repeticoes}
        />
        <Button
          styles={styles.salvar}
          onPress={() => this.btnAction()}
          title={this.state.btnNome}
        />
      </View>
    );
  }
  btnAction() {
    if (this.state.btnNome == "Editar") {
      this.editar();
    } else {
      this.salvar();
    }
  }
  editar() {
    let { nome, numero, carga, series, repeticoes, key } = this.state;
    let navigation = this.props.navigation;
    let exercicios = this.props.navigation.getParam("exercicios");
    exercicios[key] = new Exercicio(nome, numero, carga, series, repeticoes);
    navigation.getParam("callback")(exercicios);
    navigation.navigate("Home");
  }
  salvar() {
    let { nome, numero, carga, series, repeticoes } = this.state;
    let navigation = this.props.navigation;
    let exercicios = this.props.navigation.getParam("exercicios");
    exercicios.unshift(new Exercicio(nome, numero, carga, series, repeticoes));
    navigation.getParam("callback")(exercicios);
    navigation.navigate("Home");
  }
  checkNumber(text) {
    let numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return [...text].map(e => (numeros.includes(e) ? e : "")).join("");
  }
}

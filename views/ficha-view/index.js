import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Ficha from "../../models/ficha";
import styles from "./styles";
import { TextInput } from "react-native-gesture-handler";

export default class CardFicha extends React.Component {
  state = {
    exercicio: "",
    numero: "",
    carga: "",
    series: "",
    repeticoes: "",
    btnNome: "Salvar",
    key: -1
  };
  componentDidMount() {
    let fichas = this.props.navigation.getParam("fichas");
    let key = this.props.navigation.getParam("key", -1);
    if (key != -1) {
      this.setState({
        btnNome: "Editar",
        exercicio: fichas[key].exercicio,
        numero: fichas[key].numero,
        carga: fichas[key].carga,
        series: fichas[key].series,
        repeticoes: fichas[key].repeticoes,
        key
      });
    }
  }
  render() {
    return (
      <View style={styles.ficha}>
        <Text>Nome Exercicio:</Text>
        <TextInput
          onChangeText={text => this.setState({ exercicio: text })}
          style={styles.input}
          value={this.state.exercicio}
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
    let { exercicio, numero, carga, series, repeticoes, key } = this.state;
    let navigation = this.props.navigation;
    let fichas = this.props.navigation.getParam("fichas");
    fichas[key] = new Ficha(exercicio, numero, carga, series, repeticoes);
    navigation.getParam("callback")(fichas);
    navigation.navigate("Home");
  }
  salvar() {
    let { exercicio, numero, carga, series, repeticoes } = this.state;
    let navigation = this.props.navigation;
    let fichas = this.props.navigation.getParam("fichas");
    fichas.unshift(
      new Ficha(exercicio, numero, carga, series, repeticoes, fichas)
    );
    navigation.getParam("callback")(fichas);
    navigation.navigate("Home");
  }
  checkNumber(text) {
    let numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return [...text].map(e => (numeros.includes(e) ? e : "")).join("");
  }
}

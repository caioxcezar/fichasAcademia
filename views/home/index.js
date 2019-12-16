import React from "react";
import { View, ScrollView } from "react-native";
import PlusButton from "../plus-button";
import CardExercicio from "../card-exercicio";
import styles from "./styles";
import { AsyncStorage } from "react-native";
import Exercicio from "../../models/exercicio";

export default class Home extends React.Component {
  state = {
    exercicios: []
  };
  componentDidMount() {
    console.log(this.state.exercicios[this.state.exercicios.length - 1]);
    this.loadJson();
  }
  callback(exercicio) {
    let exercicios = this.state.exercicios;
    exercicios.forEach(e => {
      if (e.cod == exercicio.cod) {
        e = exercicio;
        this.setState({
          exercicios
        });
        this.updateJson();
        return;
      }
    });
    exercicios.unshift(exercicio);
    this.setState({
      exercicios
    });
    this.updateJson();
  }
  deletar(key) {
    let { exercicios } = this.state;
    let index = exercicios.findIndex(e => e.cod == key);
    exercicios.splice(index, 1);
    this.setState({ exercicios });
    this.forceUpdate();
    this.updateJson();
  }
  editar(exercicio) {
    let editarTexto = () => {
      this.props.navigation.navigate("ExercicioView", {
        callback: this.callback.bind(this),
        exercicio,
        key: exercicio.cod
      });
    };
    editarTexto();
    this.forceUpdate();
  }
  async updateJson() {
    await AsyncStorage.setItem(
      "exercicios",
      JSON.stringify(this.state.exercicios)
    )
      .then(() => {
        console.log("It was saved successfully");
      })
      .catch(erro => {
        console.log(`There was an error saving the product: ${erro.message}`);
      });
  }
  async loadJson() {
    let exercicios = [];
    try {
      exercicios = JSON.parse(await AsyncStorage.getItem("exercicios"));
      exercicios = exercicios.map(
        e =>
          new Exercicio(
            e._nome,
            e._numero,
            e._carga,
            e._series,
            e._repeticoes,
            e._cod
          )
      );
      if (exercicios == null) exercicios = [];
      this.setState({ exercicios });
    } catch (erro) {
      console.log(`There was an error loading the product: ${erro.message}`);
    }
  }

  render() {
    let { exercicios } = this.state;
    let next =
      exercicios.length == 0 ? 0 : exercicios[exercicios.length - 1].cod + 1;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.exercicios}>
          {exercicios.map(item => (
            <CardExercicio
              exercicio={item}
              key={item.cod}
              deletar={() => this.deletar(item.cod)}
              editar={() => this.editar(item)}
            />
          ))}
        </ScrollView>
        <PlusButton
          link={() => {
            this.props.navigation.navigate("ExercicioView", {
              callback: this.callback.bind(this),
              key: next
            });
          }}
        />
      </View>
    );
  }
}

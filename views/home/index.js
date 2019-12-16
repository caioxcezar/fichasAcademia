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
    this.loadJson();
  }
  callback(exercicios) {
    this.setState({
      exercicios: [...exercicios]
    });
    this.updateJson();
  }
  deletar(key) {
    let { exercicios } = this.state;
    exercicios.splice(key, 1);
    this.setState({ exercicios });
    this.updateJson();
  }
  editar(key) {
    let { exercicios } = this.state;
    this.setState({ exercicios });
    let editarTexto = () => {
      this.props.navigation.navigate("ExercicioView", {
        callback: this.callback.bind(this),
        exercicios,
        key
      });
    };
    editarTexto();
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
          new Exercicio(e._nome, e._numero, e._carga, e._series, e._repeticoes)
      );
      if (exercicios == null) exercicios = [];
      this.setState({ exercicios });
    } catch (erro) {
      console.log(`There was an error loading the product: ${erro.message}`);
    }
  }

  render() {
    let { exercicios } = this.state;
    const listarExercicios = exercicios.map((item, key) => (
      <CardExercicio
        exercicio={item}
        key={key}
        id={key}
        deletar={() => this.deletar(key)}
        editar={() => this.editar(key)}
      />
    ));
    return (
      <View style={styles.container}>
        <ScrollView style={styles.exercicios}>{listarExercicios}</ScrollView>
        <PlusButton
          link={() => {
            this.props.navigation.navigate("ExercicioView", {
              callback: this.callback.bind(this),
              exercicios
            });
          }}
        />
      </View>
    );
  }
}

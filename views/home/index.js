import React from "react";
import { View, Alert } from "react-native";
import PlusButton from "../plus-button";
import CardExercicio from "../card-exercicio";
import styles from "./styles";
import { AsyncStorage } from "react-native";
import Exercicio from "../../models/exercicio";
import update from "react-addons-update";
import { FlatList } from "react-native-gesture-handler";

export default class Home extends React.Component {
  state = {
    exercicios: []
  };
  componentDidMount() {
    this.loadJson();
  }
  callback(exercicio) {
    let exercicios = this.state.exercicios;
    let edicao = false;
    exercicios.forEach((e, index) => {
      if (Math.floor(e.cod) == Math.floor(exercicio.cod)) {
        exercicio.cod += 0.0001;
        this.setState({
          exercicios: update(exercicios, {
            $splice: [[index, 1, exercicio]]
          })
        });
        edicao = true;
      }
    });
    if (!edicao) {
      this.setState({
        exercicios: update(exercicios, { $push: [exercicio] })
      });
    }
    this.updateJson();
  }
  deletar(key) {
    let { exercicios } = this.state;
    let index = exercicios.findIndex(e => e.cod == key);
    exercicios.splice(index, 1);
    this.setState({ exercicios });
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
    this.updateJson();
  }
  async updateJson() {
    await AsyncStorage.setItem(
      "exercicios",
      JSON.stringify(
        this.state.exercicios.map(e => {
          e.cod = Math.floor(e.cod);
          return e;
        })
      )
    )
      .then(() => {})
      .catch(erro => {
        Alert.alert("Atenção", `Erro: ${erro.message}`);
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
      Alert.alert("Atenção", `Erro: ${erro.message}`);
    }
  }

  render() {
    let { exercicios } = this.state;
    let next =
      exercicios.length === 0
        ? 1
        : Math.floor(exercicios[exercicios.length - 1].cod) + 1;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.exercicios}
          data={exercicios}
          renderItem={({ item }) => (
            <CardExercicio
              id={item.cod}
              exercicio={item}
              deletar={() => this.deletar(item.cod)}
              editar={() => this.editar(item)}
            />
          )}
          keyExtractor={item => "" + item.cod}
        />
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

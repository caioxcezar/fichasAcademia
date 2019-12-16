import React from "react";
import { View, ScrollView } from "react-native";
import PlusButton from "../plus-button";
import CardFicha from "../card-ficha";
import styles from "./styles";
import { AsyncStorage } from "react-native";
import Ficha from "../../models/ficha";

export default class Home extends React.Component {
  state = {
    fichas: []
  };
  componentDidMount() {
    this.loadJson();
  }
  callback(fichas) {
    this.setState({
      fichas: [...fichas]
    });
    this.updateJson();
  }
  deletar(key) {
    let { fichas } = this.state;
    fichas.splice(key, 1);
    this.setState({ fichas });
    this.updateJson();
  }
  editar(key) {
    let { fichas } = this.state;
    this.setState({ fichas });
    let editarTexto = () => {
      this.props.navigation.navigate("FichaView", {
        callback: this.callback.bind(this),
        fichas,
        key
      });
    };
    editarTexto();
  }
  async updateJson() {
    await AsyncStorage.setItem("fichas", JSON.stringify(this.state.fichas))
      .then(() => {
        console.log("It was saved successfully");
      })
      .catch(erro => {
        console.log(`There was an error saving the product: ${erro.message}`);
      });
  }
  async loadJson() {
    let fichas = [];
    try {
      fichas = JSON.parse(await AsyncStorage.getItem("fichas"));
      fichas = fichas.map(
        e =>
          new Ficha(e._exercicio, e._numero, e._carga, e._series, e._repeticoes)
      );
      if (fichas == null) fichas = [];
      this.setState({ fichas });
    } catch (erro) {
      console.log(`There was an error loading the product: ${erro.message}`);
    }
  }

  render() {
    let { fichas } = this.state;
    const listarFichas = fichas.map((item, key) => (
      <CardFicha
        ficha={item}
        key={key}
        id={key}
        deletar={() => this.deletar(key)}
        editar={() => this.editar(key)}
      />
    ));
    return (
      <View style={styles.container}>
        <ScrollView style={styles.fichas}>{listarFichas}</ScrollView>
        <PlusButton
          link={() => {
            this.props.navigation.navigate("FichaView", {
              callback: this.callback.bind(this),
              fichas
            });
          }}
        />
      </View>
    );
  }
}

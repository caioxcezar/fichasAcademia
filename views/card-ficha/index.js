import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles";

export default class CardFicha extends Component {
  state = {
    ficha: this.props.ficha,
    id: this.props.id
  };

  render() {
    let { ficha, id } = this.state;
    return (
      <View style={styles.ficha}>
        <Text>Nome Exercicio: {ficha.exercicio}</Text>
        <Text>Nº: {ficha.numero}</Text>
        <Text>Carga: {ficha.carga}</Text>
        <Text>Series: {ficha.series}</Text>
        <Text>Repetições: {ficha.repeticoes}</Text>
        <TouchableOpacity
          onPress={() => this.props.deletar(id)}
          activeOpacity={0.7}
          style={styles.trash}
        >
          <FontAwesomeIcon icon={faTrash} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.editar(id)}
          activeOpacity={0.7}
          style={styles.edit}
        >
          <FontAwesomeIcon icon={faEdit} />
        </TouchableOpacity>
      </View>
    );
  }
}

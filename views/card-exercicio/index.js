import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles";

export default class CardExercicio extends Component {
  state = {
    exercicio: this.props.exercicio,
    id: this.props.id
  };

  render() {
    let { exercicio, id } = this.state;
    return (
      <View style={styles.exercicio}>
        <Text>Nome Exercicio: {exercicio.nome}</Text>
        <Text>Nº: {exercicio.numero}</Text>
        <Text>Carga: {exercicio.carga}</Text>
        <Text>Series: {exercicio.series}</Text>
        <Text>Repetições: {exercicio.repeticoes}</Text>
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

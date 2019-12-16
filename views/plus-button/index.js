import React, { Component } from "react";
import { TouchableOpacity, Alert, View, Text } from "react-native";
import styles from "./styles";
export default class PlusButton extends Component {
  clickHandler = () => {
    this.props.link();
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={this.clickHandler}
        style={styles.TouchableOpacityStyle}
      >
        <View style={styles.Button}>
          <Text style={styles.Text}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

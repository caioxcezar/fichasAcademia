import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./views/home";
import ExercicioView from "./views/exercicio-view";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Ficha"
      }
    },
    ExercicioView: {
      screen: ExercicioView,
      navigationOptions: {
        title: "Exercicio"
      }
    }
  },
  { headerLayoutPreset: "center" }
);

export default createAppContainer(AppNavigator);

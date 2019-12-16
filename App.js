import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./views/home";
import FichaView from "./views/ficha-view";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Fichas"
      }
    },
    FichaView: {
      screen: FichaView,
      navigationOptions: {
        title: "Criar ficha"
      }
    }
  },
  { headerLayoutPreset: "center" }
);

export default createAppContainer(AppNavigator);

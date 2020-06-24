import { SHOPCART_MENU_ID, UPDATED_MENU } from "../../constants/app.constants";

export function navigateToSettings(props, navigation) {
  setTimeout(() => {
    const { updateComponentState } = props;
    updateComponentState(SHOPCART_MENU_ID, UPDATED_MENU, "Home");
  }, 1000);
  navigation.navigate("Home");
}

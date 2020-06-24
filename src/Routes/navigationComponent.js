import { StackActions, NavigationActions } from "react-navigation";

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

export function resetNavigationAndPush(screen, params) {
  return (resetAction = StackActions.reset({
    index: 0, // <-- currect active route from actions array
    actions: [NavigationActions.navigate({ routeName: screen, params })],
  }));
}

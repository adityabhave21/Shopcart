import React, { Component, createRef } from "react";
import { createStackNavigator } from "react-navigation";
import ScalingDrawer from "react-native-scaling-drawer";

// import NavigationService from './NavigationService';

import Home from "./screens/Home";
import Profile from "./screens/Profile";
import LeftMenu from "./LeftMenu";
import SideMenu from "../SideMenu/SideMenu";
import FlashScreen from "../pageContent/FlashScreen";
import Login from "../pageContent/Login";
import PrivacyPolicy from "../pageContent/PrivacyPolicy";
import AboutUs from "../pageContent/AboutUs";
import { setTopLevelNavigator } from "./navigationComponent";

const AppStack = createStackNavigator({
  FlashScreen: { screen: FlashScreen },
  Login: { screen: Login },
  AboutUs: {
    screen: AboutUs,
  },
});

export const drawer = createRef();

const defaultScalingDrawerConfig = {
  scalingFactor: 0.6,
  minimizeFactor: 0.6,
  swipeOffset: 20,
};

export default class AppNavigation extends Component {
  render() {
    return (
      <ScalingDrawer
        ref={drawer}
        content={<SideMenu drawer={drawer} />}
        {...defaultScalingDrawerConfig}
        onClose={() => console.log("close")}
        onOpen={() => console.log("open")}
      >
        <AppStack
          ref={(navigatorRef) => {
            setTopLevelNavigator(navigatorRef);
          }}
        />
      </ScalingDrawer>
    );
  }
}

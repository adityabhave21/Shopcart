import React from "react";
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import SideMenu from "../SideMenu/SideMenu";
import FlashScreen from "../pageContent/FlashScreen";
import Login from "../pageContent/Login";
import PrivacyPolicy from "../pageContent/PrivacyPolicy";
import AboutUs from "../pageContent/AboutUs";
import Home from "../pageContent/Home";
import HotOffer from "../pageContent/HotOffer";
import MyCart from "../pageContent/MyCart";
import Search from "../pageContent/Search";
import Profile from "../pageContent/Profile";
import { Colors } from "../components/utils/colors.utils";
import { START_SCREEN } from "../constants/app.constants";

export const Tabs = createBottomTabNavigator(
  {
    Home: { screen: Home },
    HotOffer: { screen: HotOffer },
    MyCart: { screen: MyCart },
    Search: { screen: Search },
    Profile: { screen: Profile },
  },
  {
    order: ["Home", "HotOffer", "MyCart", "Search", "Profile"],
    tabBarOptions: {
      animationEnabled: true,
      swipeEnabled: true,
      showIcon: false,
      activeBackgroundColor: Colors.ThemeBlackGrey,
      inactiveBackgroundColor: Colors.White,
      activeTintColor: Colors.White,
      inactiveTintColor: Colors.ThemeBlackGrey,
      tabStyle: {
        marginTop: 0,
        textAlign: "center",
        justifyContent: "center",
        textAlignVertical: "center",
      },
      labelStyle: {
        fontSize: 17,
      },
    },
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: Tabs },
    AboutUs: { screen: AboutUs },
    PrivacyPolicy: { screen: PrivacyPolicy },
  },
  {
    initialRouteName: START_SCREEN,
    contentComponent: SideMenu,
    drawerWidth: 300,
    hideStatusBar: true,
  }
);

export default Stack = createStackNavigator(
  {
    FlashScreen: { screen: FlashScreen },
    Login: { screen: Login },
    Home: {
      screen: DrawerNavigator,
    },
  },
  {
    initialRouteName: "FlashScreen",
    mode: "card",
    headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.ThemeColor,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }),
  }
);

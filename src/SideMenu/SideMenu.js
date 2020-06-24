import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import menuStyles from "./SideMenu.style";
import { NavigationActions } from "react-navigation";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  BackHandler,
} from "react-native";
import main_menu from "./MainMenu.json";
import {
  updateComponentState,
  deleteComponentState,
} from "../actions/component.actions";
import { requestData } from "../actions/data.actions";
import { getText, getIcon } from "../components/utils/ui.utils";
import { Colors } from "../components/utils/colors.utils";
import {
  START_SCREEN_MENU,
  UPDATED_MENU,
  SHOPCART_MENU_ID,
} from "../constants/app.constants";
import { showAlertWithOkCancelAction } from "../components/utils/common.utils";
import DefaultPreference from "react-native-default-preference";
import { resetNavigationAndPush } from "../Routes/navigationComponent";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenu: START_SCREEN_MENU,
      isConnected: false,
    };
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menuState && this.props.menuState !== nextProps.menuState) {
      const selectedMenu = nextProps.menuState.get(UPDATED_MENU, "");
      // console.log("next selectedMenu = ", selectedMenu);
      if (selectedMenu && selectedMenu !== "") {
        this.setState({ selectedMenu }, () => {
          const { deleteComponentState } = this.props;
          deleteComponentState(SHOPCART_MENU_ID);
        });
      }
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  navigateToScreen(route, selectedMenu) {
    // console.warn("this.state.selectedMenu ", this.state.selectedMenu);
    // console.warn("selectedMenu = ", selectedMenu);

    if (this.state.selectedMenu === selectedMenu) {
      // console.log("toggling drawer action");
      this.props.navigation.toggleDrawer();
    } else {
      this.setState({ selectedMenu }, () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route,
        });
        this.props.navigation.dispatch(navigateAction);
      });
    }
  }

  clearDefaultsAndLogout = () => {
    DefaultPreference.setMultiple({
      userName: "",
      userPassword: "",
    }).then(() => {
      this.props.navigation.dispatch(resetNavigationAndPush("FlashScreen"));
    });
  };

  callLogout = () => {
    showAlertWithOkCancelAction(
      "Are you sure you want to logout?",
      "",
      null,
      () => this.clearDefaultsAndLogout()
    );
  };

  getMenuSingleItem(item) {
    let MenuName = item.name;
    // console.warn("item.name = ", item.name);
    let menuStyle = menuStyles.menuItem;
    let textStyle = menuStyles.menuNameText;
    let menuColor = Colors.White;
    if (this.state.selectedMenu === MenuName) {
      menuStyle = menuStyles.selectedMenuItem;
      textStyle = menuStyles.selectedMenuNameText;
      menuColor = Colors.ThemeColor;
    }

    let onPressFunc;
    if (MenuName === "Logout") {
      onPressFunc = () => this.callLogout();
    } else {
      onPressFunc = () => this.navigateToScreen(item.routerName, MenuName);
    }
    return (
      <TouchableOpacity key={MenuName} style={menuStyle} onPress={onPressFunc}>
        <View style={menuStyles.menuIcon}>
          {getIcon(item.iconName, item.iconFamily, menuColor, 20)}
        </View>
        <View style={menuStyles.menuName}>{getText(MenuName, textStyle)}</View>
      </TouchableOpacity>
    );
  }

  getMenuItems(sectionStyle) {
    const sectionWisemenu = main_menu.menuList.map((item) =>
      this.getMenuSingleItem(item)
    );
    // return <ScrollView style={sectionStyle}>{sectionWisemenu}</ScrollView>;
    return <ScrollView style={sectionStyle}>{sectionWisemenu}</ScrollView>;
  }

  render() {
    // console.warn("in render of SideMenu ");
    return (
      <View style={menuStyles.container}>
        <View style={menuStyles.header}>
          <Image
            resizeMode="stretch"
            source={require("../components/assets/50off.png")}
            style={{ flex: 1, width: undefined, height: undefined }}
          />
        </View>
        <View style={menuStyles.bottom}>
          {this.getMenuItems(menuStyles.section1)}
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object,
};

export function mapStateToProps(state, ownProps) {
  const { component } = state;
  return {
    menuState: component.get(SHOPCART_MENU_ID, Map()),
  };
}

export default connect(mapStateToProps, {
  updateComponentState,
  deleteComponentState,
  requestData,
})(SideMenu);

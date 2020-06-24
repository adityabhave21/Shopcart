// @ts-nocheck
import React, { Component } from "react";
import { connect } from "react-redux";
import { TouchableOpacity, View, BackHandler, Image } from "react-native";
import { LOGIN_ID } from "../../constants/app.constants";
import { getText } from "../../components/utils/ui.utils";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import { styles } from "../../styles/styles";
import { Colors } from "../../components/utils/colors.utils";
import { resetNavigationAndPush } from "../../Routes/navigationComponent";
import Loader from "../../widgets/Loader";
import NetInfo from "@react-native-community/netinfo";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import * as Animatable from "react-native-animatable";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isForgotPassword: false,
      showLoader: false,
      isConnected: true,
      isRemember: false,
      isSignIn: true,
    };
    // NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentDidMount() {}

  handleConnectionChange = (connectionInfo) => {
    // NetInfo.isConnected.fetch().then((isConnected) => {
    //   this.setState({ isConnected });
    // });
  };

  handleBackButtonClick = () => {};

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // NetInfo.isConnected.removeEventListener(
    //   "connectionChange",
    //   this.handleConnectionChange
    // );
  }

  toggleLoginSignup() {
    this.setState({ isSignIn: !this.state.isSignIn });
  }

  navigateToHome() {
    const { navigation } = this.props;
    navigation.dispatch(resetNavigationAndPush("Home"));
  }

  render() {
    let { showLoader, isSignIn } = this.state;
    const { navigation } = this.props;

    let tabStyle1 = {
      width: "15%",
      marginRight: "1%",
      backgroundColor: isSignIn ? Colors.ThemeColor : Colors.ThemeLightGrey,
    };
    let tabStyle2 = {
      width: "15%",
      backgroundColor: isSignIn ? Colors.ThemeLightGrey : Colors.ThemeColor,
    };

    let titleName = isSignIn ? "SIGN IN" : "SIGN UP";

    return (
      <TouchableOpacity
        style={{ ...styles.baseTopView1, padding: "3%" }}
        activeOpacity={1}
      >
        {showLoader === true ? <Loader showLoader={showLoader} /> : null}
        <View style={{ ...styles.loginUpper, padding: "1%" }}>
          <View style={{ width: "60%", paddingTop: "3%" }}>
            <Image
              style={{ ...styles.w100h100, height: "60%" }}
              resizeMode="stretch"
              source={require("../../components/assets/ShopCartLogo.png")}
            />
          </View>
          <View style={styles.loginUpperTextView}>
            {getText("Skip", styles.loginUpperText, () =>
              this.navigateToHome()
            )}
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          {getText(titleName, styles.loginText)}
          <View
            style={{
              flexDirection: "row",
              height: "10%",
            }}
          >
            <TouchableOpacity
              style={tabStyle1}
              onPress={() => this.toggleLoginSignup()}
            />
            <TouchableOpacity
              style={tabStyle2}
              onPress={() => this.toggleLoginSignup()}
            />
          </View>
        </View>
        {isSignIn ? (
          <Animatable.View
            animation="fadeIn"
            easing="ease"
            iterationCount={1}
            style={styles.mainViewOverlay}
          >
            <SignIn navigation={navigation} />
          </Animatable.View>
        ) : (
          <Animatable.View
            animation="fadeIn"
            easing="ease"
            iterationCount={1}
            style={styles.mainViewOverlay}
          >
            <SignUp navigation={navigation} />
          </Animatable.View>
        )}
      </TouchableOpacity>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  const { data } = state;
  return {
    dataState: data.getIn([LOGIN_ID, "apiData"], null),
  };
}

export default connect(mapStateToProps, {
  updateComponentState,
  requestData,
})(Login);

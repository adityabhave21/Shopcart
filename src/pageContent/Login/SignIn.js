// @ts-nocheck
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  View,
  Keyboard,
  BackHandler,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { LOGIN_ID, LOGGEDIN_USER_DATA } from "../../constants/app.constants";
import {
  LOGIN_DLGS,
  INTERNAL_SERVER_ERROR,
} from "../../constants/dialog.constants";
import {
  getText,
  getErrorDiv,
  getTextField,
} from "../../components/utils/ui.utils";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import { styles } from "../../styles/styles";
// import { callWebService } from "../../components/utils/webservice.utils";
import { resetNavigationAndPush } from "../../Routes/navigationComponent";
import {
  internetAlert,
  isEmpty,
  goToAppStore,
} from "../../components/utils/common.utils";

import PasswordTextField from "../../widgets/PasswordTextField";
import Checkbox from "../../widgets/CheckBox";
import DefaultPreference from "react-native-default-preference";
import LinearButton from "../../widgets/LinearButton";
import { setDefaultPref } from "./login.utils";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isForgotPassword: false,
      showLoader: false,
      isConnected: true,
      errorMessage: "",
      errorDivColor: "",
      errorUserName: "",
      errorPassword: "",
      isRemember: false,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.setState({ showLoader: true }, () => {
      setTimeout(() => {
        DefaultPreference.getMultiple(["userName", "userPassword"]).then(
          (obj) => {
            if (obj.length === 2) {
              this.setState({
                username: obj[0],
                password: obj[1],
                isRemember: true,
                showLoader: false,
                errorMessage: "",
                errorDivColor: "",
                errorUserName: "",
                errorPassword: "",
              });
            } else {
              this.setState({ isRemember: false, showLoader: false });
            }
          }
        );
      }, 1000);
    });
  }

  handleBackButtonClick = () => {};

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  loginOnPressFunc() {
    const { isConnected } = this.state;
    if (isConnected) {
      this.setState(
        {
          errorMessage: "",
          errorDivColor: "",
          errorUserName: "",
          errorPassword: "",
        },
        () => {
          this.checkLogin();
        }
      );
    } else internetAlert();
  }

  checkLogin() {
    this.dismissKeyboard();
    // const { requestData } = this.props;
    const { username, password } = this.state;

    if (isEmpty(username) && isEmpty(password)) {
      this.setState({
        errorUserName: LOGIN_DLGS.errorUserName,
        errorPassword: LOGIN_DLGS.errorPassword,
      });
    } else if (isEmpty(username)) {
      this.setState({ errorUserName: LOGIN_DLGS.errorUserName });
    } else if (isEmpty(password)) {
      this.setState({ errorPassword: LOGIN_DLGS.errorPassword });
    } else {
      this.setState({ showLoader: true }, () => {
        const userData = { username, password };
        this.navigateToHome(userData);
      });
    }
  }

  navigateToHome(userData) {
    console.warn("in navigateToHome");
    const { isRemember } = this.state;
    const { updateComponentState, navigation } = this.props;
    updateComponentState(LOGIN_ID, LOGGEDIN_USER_DATA, userData);
    if (isRemember === false) setDefaultPref("", "");
    else setDefaultPref(userData.username, userData.password);
    navigation.dispatch(resetNavigationAndPush("Home"));
  }

  clearError() {
    this.dismissKeyboard();
    this.setState({
      errorMessage: "",
      errorDivColor: "",
      errorUserName: "",
      errorPassword: "",
    });
  }

  setLoaderErr(showLoader, errorMessage, errorDivColor) {
    this.setState({
      showLoader,
      errorMessage,
      errorDivColor,
    });
  }

  checkBoxPressed() {
    this.setState({ isRemember: !this.state.isRemember });
  }

  dismissKeyboard() {
    Keyboard.dismiss();
  }

  getUI() {
    let {
      username,
      errorUserName,
      password,
      errorMessage,
      errorDivColor,
    } = this.state;

    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <TouchableOpacity
          style={styles.loginLower}
          activeOpacity={1}
          onPress={() => this.clearError()}
        >
          <View style={styles.ViewUsername}>
            {getTextField(
              errorUserName,
              "Username",
              username,
              (username) => this.setState({ username, errorUserName: "" }),
              false,
              false,
              "default",
              true
            )}
          </View>
          <View style={styles.ViewPassword}>
            <PasswordTextField
              label={"Password"}
              value={password}
              Errorpassword={this.state.errorPassword}
              onChangeText={(password) =>
                this.setState({ password, errorPassword: "" })
              }
            />
          </View>
          <View
            style={{
              width: "100%",
              marginTop: "3%",
              flexDirection: "row",
            }}
          >
            <View style={styles.rememberMainView}>
              <Checkbox
                checked={this.state.isRemember}
                label="Remember Me"
                onChange={() => this.checkBoxPressed()}
              />
            </View>
            <View style={{ width: "50%" }}>
              {getText("Forgot Password?", styles.ForgotLink)}
            </View>
          </View>
          <View style={styles.loginBtnSection}>
            <TouchableOpacity onPress={() => this.loginOnPressFunc()}>
              <LinearButton
                text={"Login"}
                textStyle={styles.loginButtonText}
                buttonStyle={styles.loginButton}
              />
            </TouchableOpacity>
          </View>
          {errorMessage ? getErrorDiv(errorMessage, errorDivColor) : null}
        </TouchableOpacity>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return Platform.OS === "ios" ? (
      <KeyboardAvoidingView behavior="position">
        {this.getUI()}
      </KeyboardAvoidingView>
    ) : (
      this.getUI()
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
})(SignIn);

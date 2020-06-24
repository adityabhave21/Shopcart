// @ts-nocheck
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  View,
  Keyboard,
  Platform,
  BackHandler,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { LOGIN_ID, LOGGEDIN_USER_DATA } from "../../constants/app.constants";
import {
  LOGIN_DLGS,
  VALIDATION_DLGS,
  INTERNAL_SERVER_ERROR,
} from "../../constants/dialog.constants";
import {
  REGEX_EMAIL,
  REGEX_MOBILE,
} from "../../constants/validationRegex.constants";
import { getErrorDiv, getTextField } from "../../components/utils/ui.utils";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import { styles } from "../../styles/styles";
// import { callWebService } from "../../components/utils/webservice.utils";
import { resetNavigationAndPush } from "../../Routes/navigationComponent";
import {
  internetAlert,
  isEmpty,
  goToAppStore,
  validateWithRegex,
} from "../../components/utils/common.utils";
import PasswordTextField from "../../widgets/PasswordTextField";
import LinearButton from "../../widgets/LinearButton";
import { setDefaultPref } from "./login.utils";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      EMailAddress: "",
      mobile: "",
      isForgotPassword: false,
      showLoader: false,
      isConnected: true,
      errorMessage: "",
      errorDivColor: "",
      errorUserName: "",
      errorPassword: "",
      errorEMailAddress: "",
      errorMobile: "",
      isRemember: false,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {};

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  signUpOnPressFunc() {
    const { isConnected } = this.state;
    if (isConnected) {
      this.setState(
        {
          errorMessage: "",
          errorDivColor: "",
          errorUserName: "",
          errorPassword: "",
          errorEMailAddress: "",
          errorMobile: "",
        },
        () => {
          this.checkSignUp();
        }
      );
    } else internetAlert();
  }

  checkSignUp() {
    this.dismissKeyboard();
    // const { requestData } = this.props;
    const { username, password, EMailAddress, mobile } = this.state;
    if (
      isEmpty(username) ||
      isEmpty(password) ||
      isEmpty(EMailAddress) ||
      isEmpty(mobile)
    ) {
      this.setState({
        errorUserName: LOGIN_DLGS.errorUserName,
        errorPassword: LOGIN_DLGS.errorPassword,
        errorEMailAddress: VALIDATION_DLGS.correctEmailID,
        errorMobile: VALIDATION_DLGS.correctPhone,
      });
    } else if (isEmpty(username)) {
      this.setState({ errorUserName: LOGIN_DLGS.errorUserName });
    } else if (isEmpty(password)) {
      this.setState({ errorPassword: LOGIN_DLGS.errorPassword });
    } else if (
      isEmpty(EMailAddress) ||
      validateWithRegex(EMailAddress, REGEX_EMAIL) === false
    ) {
      this.setState({ errorEMailAddress: VALIDATION_DLGS.correctEmailID });
    } else if (
      isEmpty(mobile) ||
      validateWithRegex(mobile, REGEX_MOBILE) === false
    ) {
      this.setState({ errorMobile: VALIDATION_DLGS.correctPhone });
    } else {
      this.setState({ showLoader: true }, () => {
        const userData = { username, password, EMailAddress, mobile };
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
      errorEMailAddress: "",
      errorMobile: "",
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
      EMailAddress,
      errorEMailAddress,
      mobile,
      errorMobile,
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
              "default"
            )}
          </View>
          <View style={styles.ViewUsername}>
            {getTextField(
              errorEMailAddress,
              "Email Address",
              EMailAddress,
              (EMailAddress) =>
                this.setState({ EMailAddress, errorEMailAddress: "" }),
              false,
              false,
              "default"
            )}
          </View>
          <View style={styles.ViewUsername}>
            {getTextField(
              errorMobile,
              "Mobile Number",
              mobile,
              (mobile) => this.setState({ mobile, errorMobile: "" }),
              false,
              false,
              Platform.OS === "ios" ? "numbers-and-punctuation" : "phone-pad"
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
          <View style={styles.loginBtnSection}>
            <TouchableOpacity onPress={() => this.signUpOnPressFunc()}>
              <LinearButton
                text={"Register"}
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
})(SignUp);

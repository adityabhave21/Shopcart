import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Image, AppState } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import { resetNavigationAndPush } from "../../Routes/navigationComponent";
import ProgressBar from "../../widgets/ProgressBar";
import { styles } from "../../styles/styles";
import DefaultPreference from "react-native-default-preference";

class FlashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      appState: AppState.currentState,
      isConnected: true,
    };
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    this.callLogin();
  }

  callLogin() {
    this.setState(
      {
        showLoader: true,
      },
      () => {
        setTimeout(() => {
          if (this.state.isConnected) {
            this.checkLogin();
          } else {
            this.setState({ showLoader: false });
          }
        }, 2000);
      }
    );
  }

  checkLogin() {
    setTimeout(() => {
      DefaultPreference.getMultiple(["userName", "userPassword"]).then(
        (obj) => {
          if (obj && obj[0] && obj[1]) {
            this.setState({ username: obj[0], password: obj[1] }, () => {
              this.navigateToScreen("Home");
            });
          } else {
            this.navigateToScreen("Login");
          }
        }
      );
    }, 1000);
  }

  navigateToScreen(screenName) {
    this.setState({ showLoader: false }, () => {
      this.props.navigation.dispatch(resetNavigationAndPush(screenName));
    });
  }

  _handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState });

    if (nextAppState === "background") {
      // Do something here on app background.
      // console.log("App is in Background Mode.");
    }

    if (nextAppState === "active") {
      // Do something here on app active foreground mode.
      // console.log("App is in Active Foreground Mode.");
      // console.log("App is in Active Foreground Mode.");
      this.navigateToScreen("Login");
    }

    if (nextAppState === "inactive") {
      // Do something here on app inactive mode.
      // console.log("App is in inactive Mode.");
    }
  };

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  render() {
    const { showLoader } = this.state;
    return (
      <View style={styles.baseTopView1}>
        <View style={styles.flashScreenImageView}>
          <Image
            style={styles.w100h100}
            resizeMode="stretch"
            source={require("../../components/assets/FlashScreen.png")}
          />

          {/* {showLoader === true ? <ProgressBar showLoader={showLoader} /> : null} */}
        </View>
      </View>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  const { component } = state;
  return {};
}

export default connect(mapStateToProps, {
  updateComponentState,
  requestData,
})(FlashScreen);

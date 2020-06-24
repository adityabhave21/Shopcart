import React, { Component } from "react";
import { connect } from "react-redux";
import { Keyboard, View, BackHandler, ScrollView } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import Loader from "../../widgets/Loader";
import NetInfo from "@react-native-community/netinfo";
import BarHeader from "../../widgets/BarHeader";
import { styles } from "../../styles/styles";
import { getErrorDiv, getText } from "../../components/utils/ui.utils";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      isConnected: true,
      errorMessage: "",
      errorDivColor: "",
    };
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
  }

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

  clearError() {
    Keyboard.dismiss();
    this.setState({
      errorMessage: "",
      errorDivColor: "",
    });
  }

  dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    const { showLoader, errorMessage, errorDivColor } = this.state;
    return (
      <View style={styles.container}>
        <BarHeader
          navigation={this.props.navigation}
          title={"Profile"}
          isBackButton={false}
        />
        {errorMessage ? getErrorDiv(errorMessage, errorDivColor) : null}
        {showLoader === true ? <Loader showLoader={showLoader} /> : null}

        <ScrollView style={{ height: "100%" }}>
          <View style={styles.AboutConatiner}></View>
        </ScrollView>
      </View>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  const { data } = state;
  return {};
}

export default connect(mapStateToProps, {
  updateComponentState,
  requestData,
})(Profile);

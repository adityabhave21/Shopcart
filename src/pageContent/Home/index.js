import React, { Component } from "react";
import { connect } from "react-redux";
import { Keyboard, View, BackHandler, ScrollView, Image } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import Loader from "../../widgets/Loader";
import NetInfo from "@react-native-community/netinfo";
import BarHeader from "../../widgets/BarHeader";
import { styles } from "../../styles/styles";
import { getErrorDiv, getText } from "../../components/utils/ui.utils";
import ITEMS_JSON from "../../components/JSON/items.json";

class Home extends Component {
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
          title={"Home"}
          isBackButton={false}
        />
        {errorMessage ? getErrorDiv(errorMessage, errorDivColor) : null}
        {showLoader === true ? <Loader showLoader={showLoader} /> : null}

        <ScrollView style={{ height: "100%" }}>
          <View
            style={{
              // backgroundColor: "red",
              display: "flex",
              flexWrap: "wrap",
              // height: 400,
              height: "100%",
            }}
          >
            {ITEMS_JSON.items.map((item) => {
              return (
                <View
                  style={{
                    backgroundColor: "green",
                    margin: 5,
                    height: 150,
                    width: 400,
                    flexWrap: "wrap",
                  }}
                >
                  <Image
                    style={styles.w100h100}
                    resizeMode="stretch"
                    source={{ uri: item.ImageUrl }}
                    //require("../../components/assets/item1.png")
                  />
                </View>
              );
            })}
          </View>
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
})(Home);

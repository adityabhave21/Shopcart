import React from "react";
import { Text, View, Platform, Dimensions, PixelRatio } from "react-native";

import { Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { Colors } from "./colors.utils";
import DropDownList from "../../widgets/DropDownList";
import LinearButton from "../../widgets/LinearButton";
import { Divider } from "react-native-elements";
import { styles } from "../../styles/styles";
import { isEmpty } from "./common.utils";

import { TextField } from "react-native-material-textfield";
import { LOCAL_STORAGE } from "../../constants/dialog.constants";
import { showToast } from "../../widgets/snackbar.utils";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function getLinearButton(text) {
  return <LinearButton text={text} textStyle={styles.ACscanButtonText} />;
}

export function getIcon(name, type, color, size) {
  return <Icon name={name} type={type} color={color} size={size} />;
}

export function getIconWithText(name, type, color, size, textStyle, textvalue) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Icon name={name} type={type} color={color} size={size} />
      <Text allowFontScaling={false} style={textStyle}>
        {textvalue}
      </Text>
    </View>
  );
}

export function getText(
  textvalue,
  style,
  OnPressFunc = "",
  selectable = false
) {
  return (
    <Text
      allowFontScaling={false}
      style={style}
      onPress={OnPressFunc != "" ? OnPressFunc : null}
      selectable={selectable}
    >
      {textvalue}
    </Text>
  );
}

export function getErrorDiv(
  errorMessage,
  errorDivColor,
  animation = "bounceIn"
) {
  const errorStyle = {
    backgroundColor: errorDivColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  };

  return (
    <Animatable.View
      animation={animation}
      easing="ease"
      iterationCount={1}
      style={errorStyle}
    >
      {getText(errorMessage, { color: Colors.White })}
    </Animatable.View>
  );
}

export function getErrorDivSpecial(
  errorMessage,
  errorDivColor,
  animation = "bounceIn"
) {
  const errorStyle2 = {
    backgroundColor: errorDivColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    paddingLeft: "5%",
    paddingRight: "5%",
  };
  return (
    <Animatable.View
      animation={animation}
      easing="ease"
      iterationCount={1}
      style={errorStyle2}
    >
      {getText(errorMessage, { color: Colors.White })}
    </Animatable.View>
  );
}

export function getTextField(
  error = "",
  label,
  value,
  onChange,
  isSecure = false,
  disabled = false,
  keyboard = "default"
) {
  return (
    <TextField
      disabled={disabled}
      error={error}
      allowFontScaling={false}
      Field
      fontSize={18}
      label={label}
      value={value}
      onChangeText={onChange}
      secureTextEntry={isSecure}
      keyboardType={keyboard ? keyboard : "default"} //"numeric" //phone-pad
    />
  );
}

//for counter,fault and error logs

export function successLocalToast() {
  showToast(LOCAL_STORAGE.addSuccessMsg, false, false, 2000);
}

export function failureLocalToast() {
  showToast(LOCAL_STORAGE.addFailureMsg, true, false, 2000);
}

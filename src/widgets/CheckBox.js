import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const CheckBox = (props) => {
  const {
    isChecked,
    label,
    labelFontSize,
    labelColor,
    checkedIcon,
    uncheckedIcon,
    checkedElement,
    uncheckedElement,
    containerBgColor,
    containerFlexDirection,
    containerStyle,
    iconContainerStyle,
    labelContainerStyle,
    labelStyle,
    onChange,
  } = props;

  const [isCheck, setIsChecked] = useState(isChecked);

  const checked = () => {
    setIsChecked(!isCheck);
    if ("function" === typeof onChange) {
      onChange(!isCheck);
    }
  };

  return (
    <TouchableOpacity
      onPress={checked}
      activeOpacity={1}
      style={[
        {
          display: "flex",
          alignItems: "center",
          height: 40,
          flexDirection: containerFlexDirection
            ? containerFlexDirection
            : "row",
          backgroundColor: containerBgColor,
        },
        containerStyle,
      ]}
    >
      <View
        style={[
          {
            justifyContent: "flex-start",
            height: 20,
            shadowColor: "rgba(0,0,0, .2)",
            shadowOffset: { height: 1, width: 1 },
            shadowOpacity: 1,
            shadowRadius: 1,
          },
          iconContainerStyle,
        ]}
      >
        {isCheck ? (
          checkedElement ? (
            checkedElement
          ) : (
            <Icon
              size={checkedIcon.size}
              name={checkedIcon.name}
              type={checkedIcon.type}
              color={checkedIcon.color}
            />
          )
        ) : uncheckedElement ? (
          uncheckedElement
        ) : (
          <Icon
            size={uncheckedIcon.size}
            name={uncheckedIcon.name}
            type={uncheckedIcon.type}
            color={uncheckedIcon.color}
          />
        )}
      </View>
      <View style={[{ justifyContent: "flex-end" }, labelContainerStyle]}>
        {label ? (
          <Text
            style={[{ fontSize: labelFontSize, color: labelColor }, labelStyle]}
          >
            {label}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

CheckBox.defaultProps = {
  isCheck: false,
  label: "",
  labelColor: "black",
  labelFontSize: 16,
  containerBgColor: "white",
  containerFlxDirection: "row",
  // checkedIcon: {
  //   size: 20,
  //   name: 'square-o',
  //   type: 'font-awesome',
  //   color: 'black',
  // },
  checkedIcon: {
    size: 20,
    name: "check-box",
    type: "MaterialIcons",
    color: "black",
  },
  uncheckedIcon: {
    size: 20,
    name: "check-box-outline-blank",
    type: "MaterialIcons",
    color: "black",
  },
};

export default CheckBox;

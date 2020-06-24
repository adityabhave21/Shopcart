import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import { showToast } from "../../widgets/snackbar.utils";
import {
  SERVER_STORAGE,
  REFRESH_DIALOG,
  INTERNAL_SERVER_ERROR,
} from "../../constants/dialog.constants";
import _ from "lodash";

export function showAlertWithOkCancelAction(
  title,
  msg,
  onCancelPress,
  onOkPress
) {
  Alert.alert(
    title,
    msg,
    [
      {
        text: "Cancel",
        style: "cancel",
        onPress: onCancelPress,
      },
      {
        text: "OK",
        onPress: onOkPress,
      },
    ],
    {
      cancelable: false,
    }
  );
}

export function showAlertOnlyOK(title, msg, onPressFunction) {
  Alert.alert(
    title,
    msg,
    [
      {
        text: "OK",
        onPress: onPressFunction,
      },
    ],
    {
      cancelable: false,
    }
  );
}

export function showRefreshAlert() {
  showAlertOnlyOK(REFRESH_DIALOG.title, REFRESH_DIALOG.msg, null);
}

export function navigateToIOSDeviceSetting() {
  Linking.canOpenURL("app-settings:")
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle settings url");
      } else {
        return Linking.openURL("app-settings:");
      }
    })
    .catch((err) => console.error("An error occurred", err));
}

export function isAndroidLocationOn() {
  PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  ).then((result) => {
    if (result) {
      console.log("result = ", result);
      console.log("Permission is OK");
      return true;
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      ).then((result) => {
        if (result) {
          console.log("User accept");
          return true;
        } else {
          console.log("User refuse");
          return false;
        }
      });
    }
  });
}

export function internetAlert() {
  showToast(INTERNAL_SERVER_ERROR.internetConnectionMessage, true);
}

export function getNewLine() {
  if (Platform.OS === "ios") {
    return "\n";
  } else {
    return "<br/>";
  }
}

export function callEmailLink(finalJsonArr, deviceID, peripheral, id) {
  Linking.openURL(`mailto:""?subject=Details &body=Hi greetings!`);
}

export function isEmpty(value) {
  let isEmpty = false;

  if (isUndefined(value) || isNull(value)) {
    isEmpty = true;
  } else if (typeof value === "string" && value === "") {
    isEmpty = true;
  } else if (Array.isArray(value) && value.length === 0) {
    isEmpty = true;
  } else if (whatIsIt(value) === "Object" && Object.keys(value).length === 0) {
    isEmpty = true;
  }
  return isEmpty;
}

export function isUndefined(value) {
  return value === undefined;
}

export function isNull(value) {
  return value === null;
}

let stringConstructor = "test".constructor;
let arrayConstructor = [].constructor;
let objectConstructor = {}.constructor;

export function whatIsIt(object) {
  if (object === null) {
    return "null";
  } else if (object === undefined) {
    return "undefined";
  } else if (object.constructor === stringConstructor) {
    return "String";
  } else if (object.constructor === arrayConstructor) {
    return "Array";
  } else if (object.constructor === objectConstructor) {
    return "Object";
  } else if (typeof object === "number") {
    return "Number";
  } else {
    return "unknown";
  }
}

export function goToAppStore() {}

export function validateWithRegex(str, regex) {
  if (str.match(regex)) {
    return true;
  } else {
    return false;
  }
}

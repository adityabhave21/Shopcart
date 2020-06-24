import DefaultPreference from "react-native-default-preference";
export function setDefaultPref(userName, userPassword) {
  DefaultPreference.setMultiple({
    userName,
    userPassword,
  }).then(() => {});
}

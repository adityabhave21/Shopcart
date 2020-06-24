import { Colors } from "../components/utils/colors.utils";
import { styleConstants, fontFamily } from "./styleConstants";
import { MediaQueryStyleSheet } from "react-native-responsive";

export const styles = MediaQueryStyleSheet.create(
  {
    dropdownList: {
      color: Colors.Black,
    },
    baseTopView1: {
      backgroundColor: Colors.White,
      height: "100%",
      width: "100%",
    },
    baseTopView2: {
      backgroundColor: Colors.White,
      height: "100%",
    },
    w100h100: {
      width: "100%",
      height: "100%",
    },
    wdth50flexCol: {
      width: "50%",
      flexDirection: "column",
    },

    wdth50flexColMar3: {
      width: "50%",
      flexDirection: "column",
      marginBottom: "3%",
    },

    flexColMar3: {
      flexDirection: "column",
      marginBottom: "3%",
    },

    hgt80flexCol: {
      height: "80%",
      flexDirection: "column",
    },

    w90mar1flexRow: {
      width: "100%",
      marginBottom: "1%",
      flexDirection: "row",
    },

    w90marT1flexRow: {
      width: "90%",
      marginTop: "2%",
      flexDirection: "row",
    },

    w50flexStart: {
      width: "50%",
      alignItems: "flex-start",
    },
    w50flexEnd: {
      width: "50%",
      alignItems: "flex-end",
    },

    padHor5marBot3: {
      paddingHorizontal: "5%",
      marginBottom: "3%",
    },
    marBot1: {
      marginBottom: "1%",
    },
    marBot3: {
      marginBottom: "3%",
    },
    width50padHor2: {
      width: "50%",
      paddingHorizontal: "2%",
    },
    padVer5: {
      paddingVertical: "5%",
    },

    redError: {
      color: Colors.DarkRed,
      fontSize: 12,
    },
    //-----------StatusBar Start-------------------
    headerOuterContainer: {
      height: 78,
    },
    headerMenuIconView: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    headerMenuIcon: {},

    statusBarView: {
      justifyContent: "center",
      alignItems: "baseline",
    },
    statusBarText: {
      color: Colors.White,
      fontWeight: "bold",
      fontSize: 17,
    },
    //-----------StatusBar End--------------------
    //-------activity indicator start-------------------
    activityOverlay: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.OverLay,
      zIndex: 10,
    },
    progressOverlay: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 10,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
    },

    //------activity indicator end-------------------

    //------------flashscreen start--------------------
    flashScreenImageView: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    //------------flashscreen end--------------------

    //-------------------login start-----------------------
    loginUpper: {
      height: "10%",
      display: "flex",
      flexDirection: "row",
      // backgroundColor: Colors.Red,
    },
    loginUpperTextView: {
      width: "40%",
      height: "100%",
      alignItems: "flex-end",
      justifyContent: "center",
    },
    loginUpperText: {
      color: Colors.TextDarkGrey,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "500",
    },
    loginLower: { height: "90%", alignItems: "center" },
    loginText: {
      // marginTop: "3%",
      fontSize: 20,
      fontWeight: "700",
      marginVertical: "3%",
    },
    ViewUsername: {
      marginTop: "3%",
      width: "100%",
    },
    ViewPassword: {
      marginTop: "3%",
      width: "100%",
      // backgroundColor: Colors.Red,
    },
    loginBtnSection: {
      fontSize: 28,
      textAlign: "center",
      // color: Colors.DarkBlue,
      color: Colors.ThemeColor,
      fontWeight: "900",
      // paddingBottom: "6%",
      marginTop: "6%",
      // alignItems: null,
      width: "100%",
    },
    loginButtonText: {
      fontSize: 20,
      fontWeight: "700",
      color: Colors.White,
      textAlign: "center",
    },
    loginButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.ThemeColor,
      height: 60,
      width: "100%",
      borderRadius: 50,
      shadowColor: Colors.Shadow,
      shadowOffset: { height: 1, width: 1 },
      shadowOpacity: 1,
      shadowRadius: 1,
    },
    rememberMainView: {
      width: "50%",
      flexDirection: "row",
    },
    eyeIcon: {
      position: "absolute",
      top: 33,
      right: 0,
    },
    ForgotLink: {
      textAlign: "right",
      color: Colors.loginBlue,
      paddingTop: "5%",
      fontWeight: "500",
      textDecorationLine: "underline",
    },
    //-------------------login end-------------------------
    separator: {
      width: "80%",
      height: 1,
      backgroundColor: Colors.ThemeLightGrey,
      marginHorizontal: "10%",
      marginVertical: "2%",
    },
    ThemeColorSeparator: {
      width: "100%",
      height: 1,
      backgroundColor: Colors.HeaderColor,
    },

    container: {
      backgroundColor: Colors.White,
      height: "100%",
    },
    containerLeft: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    containerRight: {
      width: "50%",
      flexDirection: "row",
      justifyContent: "flex-end",
    },

    buttonShadow: {
      shadowColor: Colors.Shadow,
      shadowOffset: { height: 1, width: 1 },
      shadowOpacity: 1,
      shadowRadius: 1,
    },

    //================= About Us
    versionText: {
      flexWrap: "wrap",
      textAlign: "center",
      fontSize: 16,
      color: Colors.ThemeColor,
      marginVertical: "3%",
    },

    AboutText: {
      marginVertical: "3%",
      marginHorizontal: "2%",
      flexWrap: "wrap",
      fontSize: 16,
      textAlign: "center",
    },
    WebsiteLink: { color: Colors.ThemeColor, fontSize: 20 },
    AboutConatiner: {
      marginTop: "6%",
      justifyContent: "center",
      alignItems: "center",
    },
    AboutBottomText: { marginHorizontal: "2%", fontSize: 16 },

    //================= About Us
  },

  {
    //Media Queries styles: For the screen which is more then 768 pixel. tab ipad
    "@media (min-device-width: 768 )": {},
    //For mini device height of 811 or less
    "@media (max-device-height: 812)": {
      //and (min-device-width: 768 )
    },
  }
);

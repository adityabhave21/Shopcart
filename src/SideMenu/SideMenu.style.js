import { Colors } from "../components/utils/colors.utils";

export default {
  container: {
    flex: 1,
    height: "100%",
  },
  header: {
    height: "30%",
    justifyContent: "center",
  },
  bottom: {
    height: "70%",
    backgroundColor: Colors.ThemeColor, //Colors.White,
  },

  section1: {
    height: 50,
  },
  section2: {
    height: 150,
  },
  section3: {
    height: 100, //android aditya
    borderBottomColor: Colors.ThemeBlackGrey,
    borderBottomWidth: 2,
  },

  menuItem: {
    backgroundColor: Colors.ThemeColor,
    height: 50,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  selectedMenuItem: {
    backgroundColor: Colors.White,
    height: 50,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // borderRadius: 5
  },

  menuIcon: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "5%",
  },
  menuName: {
    width: "70%",
    marginLeft: "3%",
    justifyContent: "center",
  },
  menuNameText: {
    color: Colors.White,
    justifyContent: "center",
    fontWeight: "bold",
  },
  selectedMenuNameText: {
    color: Colors.ThemeColor,
    justifyContent: "center",
    fontWeight: "500",
  },
};

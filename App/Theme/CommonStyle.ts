import { StyleSheet } from "react-native";
import { width } from "Utils/Constant";

const CommonStyle = StyleSheet.create({
  absoluteView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
  },
  clearBack: {
    backgroundColor: "transparent",
  },
  flexContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingTop: 10,
  },
  inputIcon: {
    height: 50,
    width: 50,
    borderBottomWidth: 1,
  },
  inputImg: {
    width: 23,
    height: 23,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  androidRipple: {
    color: "white",
    foreground: true,
  },
  flex1: { flex: 1 },
  logoStyle: {
    marginTop: 54,
    marginLeft: 52,
    marginBottom: 17,
  },
  logoText: {
    height: 68,
    width: 142,
    marginLeft: 52,
  },
  logoTextStyle: {
    fontWeight: "400",
    fontSize: 28,
    lineHeight: 34,
  },
  rowDirection: {
    flexDirection: "row",
  },
  buttonImage: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  signMargin: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  fontWeights: {
    fontWeight: "bold",
  },
  firstMarginTops: {
    marginTop: 25,
  },
  secondMarginTops: {
    marginTop: 15,
  },
  logoImageText: {
    position: "absolute",
    top: 0,
  },
  outer: {
    width: "85%",
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
  },
  marginTop: {
    marginTop: 10,
    width: "100%",
  },
  carousel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 25,
  },
  carouselImage: { height: "100%", width: "100%", borderRadius: 25 },
  ProfileButton:{
    paddingHorizontal:50,
    marginTop:10
  }
});

export default CommonStyle;

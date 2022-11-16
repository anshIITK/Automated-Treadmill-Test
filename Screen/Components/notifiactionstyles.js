import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import {
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
  ROW,
  SECONDARY_TEXT_COLOR,
} from "./style";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor:"#1d2236"
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 15,
    paddingTop: 7
},
  header: {
    padding: 15,
    marginBottom: 10,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
  },
  listItem: {
    flexDirection: "row",
    margin: 15,
    backgroundColor:"#323344",
    height:75,
    paddingTop:10,
    paddingLeft:10

  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 15,
  },
  songName: {
    paddingLeft:10,
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    color: "white",
  },
  songInfo: {
    ...ROW,
    
    paddingLeft:10,
    flex: 1,
    marginTop: 10,
  },
  singerName: {
    fontSize: 14,
    color: "cyan",
  },
  songDuration: {
    fontSize: 14,
    paddingRight:10,
    color: SECONDARY_TEXT_COLOR,
  },
  button:{
    marginRight:30,
    marginTop:15
  }

});

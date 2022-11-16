import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";


function ConnectDisconnect({ label, iconName, iconColor,functionname }) {

 
  return (
    <TouchableOpacity onPress={functionname} style={styles.box}>
      <FontAwesome5 name={iconName} size={40} color={iconColor} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#323344",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 13,
  textAlign: "center",
  color: "#848694",
    marginTop: 10,
  },
});

export default React.memo(ConnectDisconnect);

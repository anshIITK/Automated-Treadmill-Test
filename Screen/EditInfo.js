import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";



export default function EditInfo() {
return(
    <>
          <SafeAreaView style={styles.topSafeArea} />

<StatusBar style="light" />

<SafeAreaView style={styles.container}>
  <View style={styles.header}>
    <Text style={styles.headerText}>Register</Text>
  </View>

  {/* https://github.com/APSL/react-native-keyboard-aware-scroll-view */}
  <KeyboardAwareScrollView
    style={styles.content}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
    extraScrollHeight={150}
  >
    {/* https://formik.org/docs/overview */}
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
    //   onSubmit={onSubmitHandler}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <>
          <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value="dsds"
      />

      {touched && errors ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors}</Text>
        </View>
      ) : null}
    </View>

         

          


          <TouchableOpacity
            
          >
            <View
              style={
                styles.button
                
              }
            >
              <Text style={styles.buttonText}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  </KeyboardAwareScrollView>
</SafeAreaView>

    
    </>
)

}

const HEADER_BACKGROUND = "#3498db";
const CONTENT_BACKGROUND = "#f9f9f9";

export const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: HEADER_BACKGROUND,
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor:
      Platform.OS === "ios" ? CONTENT_BACKGROUND : HEADER_BACKGROUND,
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: HEADER_BACKGROUND,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
  },
  content: {
    padding: 20,
    backgroundColor: CONTENT_BACKGROUND,
  },
  formGroup: {
    marginBottom: 10,
  },
  label: {
    color: "#7d7e79",
    fontSize: 16,
    lineHeight: 30,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#e3e3e3",
    backgroundColor: "#fff",
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "#ff7675",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2980b9",
    padding: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

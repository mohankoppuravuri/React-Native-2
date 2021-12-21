import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, Button, Dimensions } from "react-native";
import PhoneInput from "react-native-phone-number-input";

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../assets/Logo.png")} />
        <Text style={styles.titleText}>Welcome to HealthNest</Text>
      </View>
      <PhoneInput defaultCode="IN" style={styles.TextInput} />
      <View style={styles.buttonContainer}>
        <Button title = "Send OTP" color="#00A981" style={styles.button} onPress={() => {
            navigation.navigate('Landing')
        }}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 55,
  },
  logo: {
    alignItems: "flex-start",
  },
  titleText: {
    fontSize: 24,
    width: 150,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "green",
    alignItems: "flex-start",
    alignContent: "center",
  },
  buttonContainer: {
    width : Dimensions.get('screen').width - 80,
    // backgroundColor : 'green'
  },
  button: {
    // backgroundColor: 'green'
  }
});

import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Image, Button, Dimensions } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { StackActions } from "react-navigation";

const App = ({ navigation, isLoggedIn, logged }) => {
  useEffect(() =>{
    if (isLoggedIn) {
      navigation.dispatch(StackActions.replace({routeName: 'Landing'}));
    }
  }, [isLoggedIn])

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../assets/Logo.png")} />
        <Text style={styles.titleText}>Welcome to HealthNest {String(isLoggedIn)}</Text>
      </View>
      <PhoneInput defaultCode="IN" style={styles.TextInput} />
      <View style={styles.buttonContainer}>
        <Button title = "Send OTP" color="#00A981" style={styles.button} onPress={() => {
            logged()
            // navigation.navigate('Landing')
        }}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    logged: () =>
      dispatch({
        type: 'LOGGEDIN',
        data: true,
      }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

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

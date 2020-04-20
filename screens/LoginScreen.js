import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";

import * as Google from "expo-google-app-auth";

const IOS_CLIENT_ID =
  "152012040893-23uud3q68b5ul0lv34bcinsai6o696p4.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "152012040893-cba82bjonv5n2r3jpah1ico8onolu429.apps.googleusercontent.com";

export default class LoginScreen extends Component {
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log("LoginScreen.js.js 21 | ", result.user.givenName);
        this.props.navigation.navigate("ExampleSocket", {
            username: result.user.givenName
        });
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('LoginScreen.js.js 30 | Error with login', e);
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login with Google" onPress={this.signInWithGoogle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
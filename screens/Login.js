import React from "react";

import Theme from "../constants/theme";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";


const Login = () => {
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground source={require("../assets/rapper.gif")} resizeMode="cover" style={styles.image}/>
      </View>
      <View style={styles.footer}>
      <Image
            style={{width:120,height:height_logo}}
            source={require("../assets/logo.png")}
          />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#fff" }]}
          
        >
          <Image
            style={styles.icons}
            source={require("../assets/googlelogo.png")}
          />
          <Text style={[styles.buttonText,{color:'black'}]}>
            Continue with google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Theme.COLORS.BLACK }]}
        >
          <Image
            style={{ width: 28, height: 28, marginTop: 2, marginRight: 8 }}
            source={require("../assets/applelogo.png")}
          />
          <Text style={[styles.buttonText, { color: "#fff" }]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.COLORS.BLACK,
  },
  header: {
    flex: 2,
  },
  footer: {
    flex: 1,
    backgroundColor: "#ededed",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  icons: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: 6,
  },
  button: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 70,
    paddingVertical: 13,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    justifyContent: "center",
    textAlign: "center",
    paddingVertical: 5,
    paddingBottom: 7,
    fontSize: 15,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
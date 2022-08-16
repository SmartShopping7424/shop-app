import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthsize, heightsize } from "../../constant/dimensions";
import { Ionicons } from "@expo/vector-icons";
import security_avatar from "../../../assets/images/security_avatar.png";
import colors from "../../constant/colors";

const SecurityGuardScreen = () => {
  const navigation = useNavigation();
  const [shopId, setShopId] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [shopVerify, setShopVerify] = useState(false);
  const [loader, setLoader] = useState(false);

  // verify shop id
  // const onVerify = async () => {};

  // on login
  // const onLogin = async () => {};

  return (
    <View style={styles.container}>
      {/* image */}
      <View style={styles.avatarView}>
        <Image
          source={security_avatar}
          resizeMode="contain"
          style={styles.avatar}
        />
      </View>

      {/*  shop id text input */}
      <View
        style={[
          styles.textInputView,
          {
            backgroundColor: shopVerify ? "#ededed" : "#fff",
          },
        ]}
      >
        <TextInput
          placeholder="Enter Shop ID"
          editable={shopVerify ? false : true}
          placeholderTextColor={colors.gray}
          autoCapitalize="characters"
          value={shopId}
          onChangeText={(text) => setShopId(text)}
          style={styles.textInput}
        />
      </View>

      {/*  user id text input */}
      <View
        style={[
          styles.textInputView,
          { display: shopVerify ? "flex" : "none" },
        ]}
      >
        <TextInput
          placeholder="User ID"
          placeholderTextColor={colors.gray}
          value={userId}
          onChangeText={(text) => setUserId(text)}
          style={styles.textInput}
        />
      </View>

      {/*  password text input */}
      <View
        style={[
          styles.textInputView,
          { display: shopVerify ? "flex" : "none" },
        ]}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.gray}
          value={password}
          secureTextEntry={!showPass}
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          delayPressIn={0}
          onPress={() => setShowPass(!showPass)}
        >
          <Ionicons
            name={showPass ? "ios-eye-outline" : "ios-eye-off-outline"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* button */}
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={() => {
          Keyboard.dismiss();
          setLoader(true);
          if (shopVerify) {
            setTimeout(async () => {
              await AsyncStorage.setItem("page", "auth");
              setLoader(false);
              const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ name: "main" }],
              });
              navigation.dispatch(resetAction);
            }, 2000);
          } else {
            setTimeout(() => {
              setLoader(false);
              setShopVerify(true);
            }, 2000);
          }
        }}
        // onPress={() => {
        //   setLoader(true);
        //   if (shopVerify) {
        //     onLogin();
        //   } else {
        //     onVerify();
        //   }
        // }}
      >
        {loader ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {shopVerify ? "Login" : "Verify"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  avatarView: {
    marginTop: (heightsize * 3) / 100,
    padding: (widthsize * 6) / 100,
    borderRadius: (widthsize * 50) / 100,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  avatar: {
    width: (widthsize * 30) / 100,
    height: (widthsize * 30) / 100,
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: (widthsize * 90) / 100,
    marginTop: (heightsize * 2) / 100,
    backgroundColor: "#fff",
    borderRadius: (widthsize * 2) / 100,
    borderWidth: 1,
    borderColor: colors.textinput_border,
    overflow: "hidden",
    padding: (widthsize * 3) / 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textInput: {
    flex: 1,
    paddingLeft: (widthsize * 1) / 100,
    fontSize: (widthsize * 3) / 100,
    color: colors.black,
    fontFamily: "Regular",
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: (heightsize * 2) / 100,
    width: (widthsize * 90) / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    padding: (widthsize * 3.5) / 100,
    borderRadius: (widthsize * 2) / 100,
  },
  buttonText: {
    fontSize: (widthsize * 3) / 100,
    fontWeight: "500",
    color: colors.white,
    fontFamily: "SemiBold",
  },
});

export default SecurityGuardScreen;

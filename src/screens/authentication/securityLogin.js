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
import { Ionicons, AntDesign } from "@expo/vector-icons";
import security_avatar from "../../../assets/images/security_avatar.png";
import colors from "../../constant/colors";
import { CameraScan, ErrorText } from "../../component";
import { getCameraPermission } from "../../utils/helper";
import { securityLoginValidator } from "../../validators/security/securityLoginValidator/securityLoginValidator";

const SecurityLogin = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    shopId: "",
    userId: "",
    password: "",
  });
  const [error, setError] = useState({
    shopId: "",
    userId: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [shopVerify, setShopVerify] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showScanner, setShowScaner] = useState(false);

  // check validation of inputs
  const checkValidation = async () => {
    const err = await securityLoginValidator(
      shopVerify ? inputs : { shopId: inputs.shopId },
      shopVerify ? "all" : "shopId"
    );
    if (Object.getOwnPropertyNames(err).length == 0) {
      Keyboard.dismiss();
      setLoader(true);
      if (shopVerify) {
        setTimeout(async () => {
          await AsyncStorage.setItem("page", "securitymain");
          await AsyncStorage.setItem("security_user_id", inputs.userId);
          setLoader(false);
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: "securitymain" }],
          });
          navigation.dispatch(resetAction);
        }, 2000);
      } else {
        setTimeout(() => {
          setLoader(false);
          setShopVerify(true);
        }, 2000);
      }
    } else {
      setError(err);
    }
  };

  // change shopId funtion
  const changeShopId = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={async () => {
          Keyboard.dismiss();
          setShopVerify(false);
          setError({ shopId: "", userId: "", password: "" });
          setInputs({ shopId: "", userId: "", password: "" });
        }}
      >
        <Text style={styles.changeText}>Change</Text>
      </TouchableOpacity>
    );
  };

  // shopId scanner function
  const showShopIdScanner = () => {
    return (
      <TouchableOpacity
        style={{ display: shopVerify ? "none" : "flex" }}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={async () => {
          Keyboard.dismiss();
          const permission = await getCameraPermission();
          if (permission) {
            setShowScaner(true);
          }
        }}
      >
        <AntDesign
          name="scan1"
          size={(widthsize * 5) / 100}
          color={colors.blue}
        />
      </TouchableOpacity>
    );
  };

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

      {/*  shop id input */}
      {shopIdInput(
        shopVerify,
        error,
        inputs,
        setError,
        setInputs,
        changeShopId,
        showShopIdScanner
      )}

      {/* shop id error msg */}
      <ErrorText
        err={error?.shopId}
        show={error?.shopId?.length > 0 ? true : false}
      />

      {/*  user id input */}
      {userIdInput(shopVerify, error, inputs, setError, setInputs)}

      {/* user id error msg */}
      <ErrorText
        err={error?.userId}
        show={error?.userId?.length > 0 && shopVerify ? true : false}
      />

      {/*  password input */}
      {passwordInput(
        shopVerify,
        error,
        inputs,
        showPass,
        setError,
        setInputs,
        setShowPass
      )}

      {/* password error msg */}
      <ErrorText
        err={error?.password}
        show={error?.password?.length > 0 && shopVerify ? true : false}
      />

      {/* button */}
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={() => checkValidation()}
      >
        {loader ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {shopVerify ? "Login" : "Verify"}
          </Text>
        )}
      </TouchableOpacity>

      {/* if show scanner */}
      {showScanner ? (
        <CameraScan
          onClose={() => {
            setShowScaner(false);
          }}
          onData={(data) => {
            setShowScaner(false);
            setError({
              ...error,
              shopId: "",
            });
            setInputs({
              ...inputs,
              shopId: data,
            });
          }}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

// shop id input
function shopIdInput(
  shopVerify,
  error,
  inputs,
  setError,
  setInputs,
  changeShopId,
  showShopIdScanner
) {
  return (
    <View
      style={[
        styles.textInputView,
        {
          backgroundColor: shopVerify ? colors.textinput_border : colors.white,
          borderColor:
            error?.shopId?.length > 0 ? colors.red : colors.textinput_border,
        },
      ]}
    >
      <TextInput
        placeholder="Enter Shop ID"
        editable={shopVerify ? false : true}
        placeholderTextColor={colors.gray}
        autoCapitalize="characters"
        value={inputs.shopId}
        onChangeText={(text) => {
          setError({
            ...error,
            shopId: "",
          });
          setInputs({
            ...inputs,
            shopId: text,
          });
        }}
        style={styles.textInput}
      />
      {shopVerify ? changeShopId() : showShopIdScanner()}
    </View>
  );
}

// user id input
function userIdInput(shopVerify, error, inputs, setError, setInputs) {
  return (
    <View
      style={[
        styles.textInputView,
        {
          display: shopVerify ? "flex" : "none",
          borderColor:
            error?.userId?.length > 0 ? colors.red : colors.textinput_border,
        },
      ]}
    >
      <TextInput
        placeholder="User ID"
        placeholderTextColor={colors.gray}
        value={inputs.userId}
        onChangeText={(text) => {
          setError({
            ...error,
            userId: "",
          });
          setInputs({
            ...inputs,
            userId: text,
          });
        }}
        style={styles.textInput}
      />
    </View>
  );
}

// password input
function passwordInput(
  shopVerify,
  error,
  inputs,
  showPass,
  setError,
  setInputs,
  setShowPass
) {
  return (
    <View
      style={[
        styles.textInputView,
        {
          display: shopVerify ? "flex" : "none",
          borderColor:
            error?.password?.length > 0 ? colors.red : colors.textinput_border,
        },
      ]}
    >
      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.gray}
        value={inputs.password}
        secureTextEntry={!showPass}
        onChangeText={(text) => {
          setError({
            ...error,
            password: "",
          });
          setInputs({
            ...inputs,
            password: text,
          });
        }}
        style={styles.textInput}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={() => setShowPass(!showPass)}
      >
        <Ionicons
          name={showPass ? "ios-eye-outline" : "ios-eye-off-outline"}
          size={(widthsize * 5) / 100}
          color={colors.blue}
        />
      </TouchableOpacity>
    </View>
  );
}

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
    height: (heightsize * 4.5) / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    borderRadius: (widthsize * 2) / 100,
  },
  buttonText: {
    fontSize: (widthsize * 3) / 100,
    color: colors.white,
    fontFamily: "SemiBold",
  },
  changeText: {
    fontSize: (widthsize * 3) / 100,
    color: colors.blue,
    fontFamily: "Medium",
  },
});

export default SecurityLogin;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Auth from "@aws-amplify/auth";
import { useNavigation, CommonActions } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthsize, heightsize } from "../../utils/dimensions";
import { Owner_API } from "../../services/api";

const HomeScreen = () => {
  const navigation = useNavigation();
  const api = new Owner_API();
  const [identityId, setIdentityId] = useState("");
  const [render, setRender] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const user = await Auth.currentCredentials();
    setIdentityId(user.identityId);
    await api.getData().then((res) => {
      if (res.kind == "ok") {
        console.log("Successfully Fetch Data");
        setData(res.data);
        setRender(true);
      } else {
        console.log(res.err);
        setRender(true);
      }
    });
  };

  const onSignOut = async () => {
    Auth.signOut()
      .then(async () => {
        console.log("Successfully Logout");
        await AsyncStorage.setItem("page", "intro");
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: "auth" }],
        });
        navigation.dispatch(resetAction);
      })
      .catch((err) => {
        console.log("Error while sign out ::: ", err);
      });
  };

  return (
    <View style={styles.container}>
      {render ? (
        <View>
          <Text>Home page</Text>
          <Text>user identity id :: {identityId}</Text>
          <Text>data fetched</Text>
          <Text>id :: {data.id}</Text>
          <Text>name:: {data.name}</Text>
          <TouchableOpacity style={{ marginTop: 30 }} onPress={onSignOut}>
            <Text>log out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text>Home page</Text>
      </View>

      <TouchableOpacity
        style={{ marginTop: 200 }}
        onPress={async () => {
          await AsyncStorage.setItem("page", "intro");
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: "auth" }],
          });
          navigation.dispatch(resetAction);
        }}
      >
        <Text>For Log Out Press Here</Text>
      </TouchableOpacity>
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

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { heightsize, widthsize } from "../../../constant/dimensions";
import colors from "../../../constant/colors";
import { Entypo } from "@expo/vector-icons";
import { OrderBill } from "../../../utils/sample-data";
import { FullScreenLoader } from "../../../component";

const SecurityBill = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [render, setRender] = useState(false);
  const [qrId, setQrId] = useState("");
  const [productData, setProductData] = useState(null);

  navigation.addListener("focus", () => {
    fetchData();
  });

  // fetch data from order
  const fetchData = () => {
    if (route.params) {
      if (route.params.qr) {
        setTimeout(() => {
          setQrId(route.params.qr);
          setProductData(OrderBill);
          setRender(true);
        }, 2000);
      }
    }
  };

  // if render false
  if (!render) {
    return <FullScreenLoader />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.white} animated />

        {/* order id view */}
        <View style={styles.orderIdView}>
          <Text style={styles.orderIdText}>
            Order ID - <Text style={styles.orderIdSubText}>{qrId}</Text>
          </Text>
        </View>

        {/* product container view */}
        <View style={styles.productContainerView}>
          <ScrollView>
            {productData.products.map((item, index) => (
              <View
                style={[
                  styles.productContainerListView,
                  {
                    borderTopWidth: index == 0 ? 1.5 : undefined,
                    borderTopColor:
                      index == 0 ? colors.textinput_border : undefined,
                  },
                ]}
                key={index}
              >
                {/* icon */}
                <Entypo
                  name="shopping-bag"
                  size={(widthsize * 5) / 100}
                  color={colors.blue}
                />

                {/* product name */}
                <View style={{ width: "60%" }}>
                  <Text style={styles.productNameText}>{item.name}</Text>
                </View>

                {/* quantity */}
                <View style={styles.quantityView}>
                  {/* first */}
                  <Text style={styles.quantityTotalText1}>
                    <Text style={{ color: colors.gray }}>x{"   "} </Text>
                    {item.quantity}
                  </Text>

                  {/* second */}
                  <Text style={styles.quantityTotalText2}>
                    <Text style={{ color: colors.gray }}>={"   "} </Text>
                    {item.quantity}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* total quantity */}
        <View style={styles.totalQuantityView}>
          <Text style={styles.totalQuantityText}>
            Total Quantity -{" "}
            <Text style={styles.totalQuantitySubText}>
              {productData.total_quantity}
            </Text>
          </Text>
        </View>

        {/* button view */}
        <TouchableOpacity
          style={styles.doneButtonView}
          activeOpacity={0.6}
          delayPressIn={0}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  orderIdView: {
    marginTop: (heightsize * 3) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  orderIdText: {
    fontSize: (widthsize * 4) / 100,
    fontFamily: "SemiBold",
    color: colors.black,
  },
  orderIdSubText: {
    fontSize: (widthsize * 4) / 100,
    fontFamily: "Regular",
    color: colors.blue,
  },
  productContainerView: {
    marginTop: (heightsize * 3) / 100,
    maxHeight: (heightsize * 65) / 100,
    overflow: "hidden",
  },
  productContainerListView: {
    padding: (widthsize * 3) / 100,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderBottomWidth: 1.5,
    borderBottomColor: colors.textinput_border,
  },
  productNameText: {
    fontSize: (widthsize * 3) / 100,
    fontFamily: "SemiBold",
    marginLeft: (widthsize * 3) / 100,
    color: colors.black,
  },
  quantityView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  quantityTotalText1: {
    fontSize: (widthsize * 3) / 100,
    fontFamily: "SemiBold",
    color: colors.black,
  },
  quantityTotalText2: {
    fontSize: (widthsize * 3) / 100,
    fontFamily: "SemiBold",
    color: colors.blue,
  },
  totalQuantityView: {
    marginTop: (heightsize * 3) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  totalQuantityText: {
    fontSize: (widthsize * 3) / 100,
    fontFamily: "SemiBold",
    color: colors.black,
  },
  totalQuantitySubText: {
    fontSize: (widthsize * 3) / 100,
    fontFamily: "Regular",
    color: colors.blue,
  },
  doneButtonView: {
    alignSelf: "center",
    marginTop: (heightsize * 2) / 100,
    width: (widthsize * 50) / 100,
    height: (heightsize * 4.5) / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    borderRadius: (widthsize * 2) / 100,
  },
  doneButtonText: {
    fontSize: (widthsize * 3) / 100,
    fontFamily: "SemiBold",
    color: colors.white,
  },
});

export default SecurityBill;

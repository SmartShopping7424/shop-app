import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { heightsize, widthsize } from "../../../constant/dimensions";
import colors from "../../../constant/colors";
import { Entypo } from "@expo/vector-icons";
import { OrderBill } from "../../../utils/sample-data";

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
    return (
      <View style={styles.absolute_container}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* order id view */}
        <View style={styles.orderIdView}>
          <Text style={styles.orderIdText}>
            Order ID : <Text style={styles.orderIdSubText}>{qrId}</Text>
          </Text>
        </View>

        {/* overall quantity */}
        <View style={styles.overallQuantityView}>
          <Text style={styles.overallQuantityText}>
            Overall Quantity :{" "}
            <Text style={styles.overallQuantitySubText}>
              {productData.overall_quantity}
            </Text>
          </Text>
        </View>

        {/* product container view */}
        <View style={styles.productContainerView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {productData.products.map((item, index) => (
              <View style={styles.productContainerListView} key={index}>
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
  absolute_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
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
  overallQuantityView: {
    alignItems: "center",
    justifyContent: "center",
  },
  overallQuantityText: {
    fontSize: (widthsize * 2.8) / 100,
    fontFamily: "Regular",
    color: colors.black,
  },
  overallQuantitySubText: {
    fontSize: (widthsize * 2.8) / 100,
    fontFamily: "Regular",
    color: colors.blue,
  },
  productContainerView: {
    marginTop: (heightsize * 3) / 100,
    backgroundColor: colors.cream,
    maxHeight: (heightsize * 65) / 100,
    padding: (widthsize * 3) / 100,
    overflow: "hidden",
  },
  productContainerListView: {
    paddingVertical: (widthsize * 3) / 100,
    flexDirection: "row",
    alignItems: "center",
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

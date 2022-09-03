import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { heightsize, widthsize } from "../../../constant/dimensions";
import colors from "../../../constant/colors";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { FullScreenLoader } from "../../../component";
import { errorToast, getOrderData, warningToast } from "../../../utils/helper";

const SecurityBill = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [render, setRender] = useState(false);
  const [qrId, setQrId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [productData, setProductData] = useState([]);
  const [itemIndex, setItemIndex] = useState([]);
  const [allCheck, setAllCheck] = useState(false);

  // use effect for back press handler
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [allCheck]);

  // fetch data
  useEffect(() => {
    fetchData();
  }, []);

  // handle back action
  const backAction = () => {
    if (allCheck) {
      return true;
    } else {
      errorToast("Please check all the products");
      return true;
    }
  };

  // fetch data from order
  const fetchData = async () => {
    if (route.params) {
      if (route.params.qr) {
        setQrId(route.params.qr);
        const data = await getOrderData();
        if (data) {
          setTimeout(() => {
            setProductData(data.products);
            setOrderId(data.order_id);
            setTotalQuantity(data.total_quantity);
            setRender(true);
          }, 2000);
        } else {
          setTimeout(() => {
            setRender(true);
          }, 2000);
        }
      }
    }
  };

  // move array item to last
  const moveArrayItemToNewIndex = (arr, old_index, new_index, item_id) => {
    setItemIndex((prev) => [...prev, item_id]);
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    setProductData([...arr]);
    if (itemIndex.length + 1 == productData.length) {
      setAllCheck(true);
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
            Order ID - <Text style={styles.orderIdSubText}>{orderId}</Text>
          </Text>
        </View>

        {/* product container view */}
        <View style={styles.productContainerView}>
          <ScrollView>
            {productData.map((item, index) => (
              <View
                style={[
                  styles.productContainerListView,
                  {
                    borderTopWidth: index == 0 ? 1.5 : undefined,
                    borderTopColor:
                      index == 0 ? colors.textinput_border : undefined,
                    marginBottom:
                      index == productData.length - 1
                        ? (heightsize * 20) / 100
                        : undefined,
                  },
                ]}
                key={index}
              >
                {/* bag icon */}
                <Entypo
                  name="shopping-bag"
                  size={(widthsize * 5) / 100}
                  color={colors.blue}
                  style={{ marginLeft: (widthsize * 3) / 100 }}
                />

                {/* product name */}
                <View style={{ width: "55%" }}>
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

                {/* check icon */}
                <TouchableOpacity
                  style={styles.checkIconContainer}
                  activeOpacity={0.6}
                  delayPressIn={0}
                  onPress={() => {
                    if (!itemIndex.includes(item.id)) {
                      moveArrayItemToNewIndex(
                        productData,
                        index,
                        productData.length - 1,
                        item.id
                      );
                    } else if (allCheck) {
                      warningToast("All products has been checked");
                    } else {
                      errorToast("Product is already checked");
                    }
                  }}
                >
                  <AntDesign
                    name={
                      itemIndex.includes(item.id)
                        ? "checksquare"
                        : "checksquareo"
                    }
                    size={(widthsize * 4) / 100}
                    color={
                      itemIndex.includes(item.id) ? colors.blue : colors.gray
                    }
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* bottom container */}
        <View style={styles.bottomContainer}>
          {/* total quantity */}
          <View style={styles.totalQuantityView}>
            <Text style={styles.totalQuantityText}>
              Total Quantity -{" "}
              <Text style={styles.totalQuantitySubText}>{totalQuantity}</Text>
            </Text>
          </View>

          {/* button view */}
          <TouchableOpacity
            style={[
              styles.doneButtonView,
              {
                backgroundColor: allCheck ? colors.blue : colors.gray,
              },
            ]}
            activeOpacity={0.6}
            delayPressIn={0}
            disabled={allCheck ? false : true}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
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
    overflow: "hidden",
  },
  productContainerListView: {
    height: (heightsize * 5) / 100,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderBottomWidth: 1.5,
    borderBottomColor: colors.textinput_border,
    overflow: "hidden",
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
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
    width: widthsize,
    height: (heightsize * 7) / 100,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: colors.textinput_border,
  },
  totalQuantityView: {
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
    width: (widthsize * 35) / 100,
    height: (heightsize * 4) / 100,
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
  checkIconContainer: {
    marginRight: (widthsize * 3) / 100,
    padding: (widthsize * 3) / 100,
  },
});

export default SecurityBill;

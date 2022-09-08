import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../../constant/colors";
import { heightsize, widthsize } from "../../../constant/dimensions";
import PickerBox from "../../../component/pickerBox/pickerBox";

const cat_arr = [
  "Category_1",
  "Category_2",
  "Category_3",
  "Category_4",
  "Category_5",
  "Category_6",
  "Category_7",
  "Category_8",
  "Category_9",
];
const sub_cat_arr = [
  "Sub_Category_1",
  "Sub_Category_2",
  "Sub_Category_3",
  "Sub_Category_4",
  "Sub_Category_5",
  "Sub_Category_6",
  "Sub_Category_7",
  "Sub_Category_8",
  "Sub_Category_9",
];
const offr_type = ["Pack", "Discount"];
const product_code = "P01";
const product_barcode = "836436635356373";

const MaintenanceProduct = () => {
  const navigation = useNavigation();
  const productCode = product_code;
  const productBarcode = product_barcode;
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("Select Category");
  const [productSubCategory, setProductSubCategory] = useState(
    "Select Sub Category"
  );
  const [productMRP, setProductMRP] = useState();
  const [productSellingPrice, setProductSellingPrice] = useState();
  const [isOffer, setIsOffer] = useState(undefined);
  const [productOfferType, setProductOfferType] = useState(
    "Select Product Offer Type"
  );
  const [productDiscountPercentage, setProductDiscountPercentage] = useState();
  const [productPackOf, setProductPackOf] = useState();
  const [productPackOfPrice, setProductPackOfPrice] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [pickerValue, setPickerValue] = useState("");
  const [loader, setLoader] = useState(false);

  // get keyboard listener
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.blue_1} animated />

      {/* header */}
      <View style={styles.header}>
        {/* icon */}
        <AntDesign
          name="arrowleft"
          size={(widthsize * 5) / 100}
          color={colors.white}
          style={{ marginLeft: (widthsize * 3) / 100 }}
          onPress={() => navigation.goBack()}
        />
        {/* title */}
        <Text style={styles.headerTitle}>Product Details</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: (heightsize * 2) / 100,
        }}
        bounces
        keyboardShouldPersistTaps="always"
      >
        {/* product code */}
        <View>
          <Text style={styles.labelText}>Product Code</Text>
          <View
            style={[
              styles.textInputView,
              { backgroundColor: colors.textinput_border },
            ]}
          >
            <Text style={styles.textInput}>{productCode}</Text>
          </View>
        </View>

        {/* product barcode */}
        <View>
          <Text style={styles.labelText}>Product Barcode</Text>
          <View
            style={[
              styles.textInputView,
              { backgroundColor: colors.textinput_border },
            ]}
          >
            <Text style={styles.textInput}>{productBarcode}</Text>
          </View>
        </View>

        {/* product name */}
        <View>
          <Text style={styles.labelText}>Product Name</Text>
          <View style={styles.textInputView}>
            <TextInput
              placeholder="Enter Product Name"
              placeholderTextColor={colors.gray}
              value={productName}
              onChangeText={(text) => {
                setProductName(text);
              }}
              style={styles.textInput}
            />
          </View>
        </View>

        {/* product category */}
        <View>
          <Text style={styles.labelText}>Product Category</Text>
          <View style={styles.textInputView}>
            <TouchableOpacity
              style={styles.iconView}
              activeOpacity={0.6}
              delayPressIn={0}
              onPress={() => {
                Keyboard.dismiss();
                setPickerValue("category");
                setShowPicker(true);
              }}
            >
              <Text
                style={[
                  styles.textInput,
                  {
                    color:
                      productCategory == "Select Category"
                        ? colors.gray
                        : colors.black,
                  },
                ]}
              >
                {productCategory}
              </Text>
              <AntDesign
                name="down"
                size={(widthsize * 3) / 100}
                color={colors.gray}
                style={{ marginRight: (widthsize * 3) / 100 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* product sub category */}
        <View>
          <Text style={styles.labelText}>Product Sub Category</Text>
          <View style={styles.textInputView}>
            <TouchableOpacity
              style={styles.iconView}
              activeOpacity={0.6}
              delayPressIn={0}
              onPress={() => {
                Keyboard.dismiss();
                setPickerValue("subcategory");
                setShowPicker(true);
              }}
            >
              <Text
                style={[
                  styles.textInput,
                  {
                    color:
                      productSubCategory == "Select Sub Category"
                        ? colors.gray
                        : colors.black,
                  },
                ]}
              >
                {productSubCategory}
              </Text>
              <AntDesign
                name="down"
                size={(widthsize * 3) / 100}
                color={colors.gray}
                style={{ marginRight: (widthsize * 3) / 100 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* product MRP */}
        <View>
          <Text style={styles.labelText}>Product MRP</Text>
          <View style={styles.textInputView}>
            <TextInput
              placeholder="Enter Product MRP"
              keyboardType="number-pad"
              placeholderTextColor={colors.gray}
              value={productMRP}
              onChangeText={(text) => {
                setProductMRP(text);
              }}
              style={styles.textInput}
            />
          </View>
        </View>

        {/* product selling price */}
        <View>
          <Text style={styles.labelText}>Product Selling Price</Text>
          <View style={styles.textInputView}>
            <TextInput
              placeholder="Enter Product Selling Price"
              keyboardType="number-pad"
              placeholderTextColor={colors.gray}
              value={productSellingPrice}
              onChangeText={(text) => {
                setProductSellingPrice(text);
              }}
              style={styles.textInput}
            />
          </View>
        </View>

        {/* offers */}
        <View>
          <Text style={styles.labelText}>Is product have offer ?</Text>
          <View style={styles.offerContainerView}>
            {/* yes */}
            <TouchableOpacity
              activeOpacity={0.6}
              delayPressIn={0}
              style={[
                styles.OfferTextView,
                { backgroundColor: isOffer ? colors.blue : colors.white },
              ]}
              onPress={() => {
                setIsOffer(true);
                setProductOfferType("Select Product Offer Type");
                setProductDiscountPercentage(0);
                setProductPackOf(0);
                setProductPackOfPrice(0);
              }}
            >
              <Text
                style={[
                  styles.OfferText,
                  { color: isOffer ? colors.white : colors.black },
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            {/* no */}
            <TouchableOpacity
              activeOpacity={0.6}
              delayPressIn={0}
              style={[
                styles.OfferTextView,
                {
                  marginLeft: (widthsize * 8) / 100,
                  backgroundColor:
                    isOffer == false ? colors.blue : colors.white,
                },
              ]}
              onPress={() => {
                setIsOffer(false);
                setProductOfferType("Select Product Offer Type");
                setProductDiscountPercentage(0);
                setProductPackOf(0);
                setProductPackOfPrice(0);
              }}
            >
              <Text
                style={[
                  styles.OfferText,
                  { color: isOffer == false ? colors.white : colors.black },
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* product offer type */}
        <View style={{ display: isOffer ? "flex" : "none" }}>
          <Text style={styles.labelText}>Product Offer Type</Text>
          <View style={styles.textInputView}>
            <TouchableOpacity
              style={styles.iconView}
              activeOpacity={0.6}
              delayPressIn={0}
              onPress={() => {
                Keyboard.dismiss();
                setPickerValue("offertype");
                setShowPicker(true);
              }}
            >
              <Text
                style={[
                  styles.textInput,
                  {
                    color:
                      productOfferType == "Select Product Offer Type"
                        ? colors.gray
                        : colors.black,
                  },
                ]}
              >
                {productOfferType}
              </Text>
              <AntDesign
                name="down"
                size={(widthsize * 3) / 100}
                color={colors.gray}
                style={{ marginRight: (widthsize * 3) / 100 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* product discount percentage */}
        <View
          style={{
            display:
              productOfferType == "Discount" && isOffer ? "flex" : "none",
          }}
        >
          <Text style={styles.labelText}>Product Discount Percentage</Text>
          <View style={styles.textInputView}>
            <TextInput
              placeholder="Enter Product Discount Percentage"
              keyboardType="number-pad"
              placeholderTextColor={colors.gray}
              value={productDiscountPercentage}
              onChangeText={(text) => {
                setProductDiscountPercentage(text);
              }}
              style={styles.textInput}
            />
          </View>
        </View>

        {/* product pack of */}
        <View
          style={{
            display: productOfferType == "Pack" && isOffer ? "flex" : "none",
          }}
        >
          <Text style={styles.labelText}>Product Pack Of</Text>
          <View style={styles.textInputView}>
            <TextInput
              placeholder="Enter Product Pack Of"
              keyboardType="number-pad"
              placeholderTextColor={colors.gray}
              value={productPackOf}
              onChangeText={(text) => {
                setProductPackOf(text);
              }}
              style={styles.textInput}
            />
          </View>
        </View>

        {/* product pack of price */}
        <View
          style={{
            display:
              productOfferType == "Pack" && productPackOf != 0 && isOffer
                ? "flex"
                : "none",
          }}
        >
          <Text style={styles.labelText}>
            Product Pack Of {productPackOf} Price
          </Text>
          <View style={styles.textInputView}>
            <TextInput
              placeholder={`Enter Product Pack Of ${productPackOf} Price`}
              keyboardType="number-pad"
              placeholderTextColor={colors.gray}
              value={productPackOfPrice}
              onChangeText={(text) => {
                setProductPackOfPrice(text);
              }}
              style={styles.textInput}
            />
          </View>
        </View>

        {/* submit button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.6}
          delayPressIn={0}
          onPress={() => navigation.goBack()}
        >
          {loader ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>

        {/* extra height */}
        {Platform.OS == "ios" ? (
          <View style={{ height: keyboardHeight }} />
        ) : (
          <View />
        )}
      </ScrollView>

      {/* picker box */}
      {showPicker ? (
        <PickerBox
          arr={
            pickerValue == "category"
              ? cat_arr
              : pickerValue == "subcategory"
              ? sub_cat_arr
              : pickerValue == "offertype"
              ? offr_type
              : ""
          }
          label={
            pickerValue == "category"
              ? "Select Category"
              : pickerValue == "subcategory"
              ? "Select Sub Category"
              : pickerValue == "offertype"
              ? "Select Product Offer Type"
              : ""
          }
          onClose={() => {
            setPickerValue("");
            setShowPicker(false);
          }}
          onValue={(e) => {
            setShowPicker(false);
            if (pickerValue == "category") {
              setProductCategory(e);
            } else if (pickerValue == "subcategory") {
              setProductSubCategory(e);
            } else if (pickerValue == "offertype") {
              setProductOfferType(e);
              setProductDiscountPercentage(0);
              setProductPackOf(0);
              setProductPackOfPrice(0);
            }
          }}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: (heightsize * 6) / 100,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blue_1,
  },
  headerTitle: {
    marginLeft: (widthsize * 3) / 100,
    fontSize: (widthsize * 4) / 100,
    fontFamily: "SemiBold",
    color: colors.white,
  },
  labelText: {
    width: (widthsize * 90) / 100,
    marginTop: (heightsize * 2) / 100,
    alignSelf: "center",
    fontSize: (widthsize * 3) / 100,
    fontFamily: "SemiBold",
    color: colors.black,
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: (heightsize * 1) / 100,
    width: (widthsize * 90) / 100,
    height: (heightsize * 5) / 100,
    backgroundColor: colors.white,
    borderRadius: (widthsize * 2) / 100,
    borderWidth: 1,
    borderColor: colors.textinput_border,
    overflow: "hidden",
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
    marginLeft: (widthsize * 3) / 100,
    fontSize: (widthsize * 2.8) / 100,
    fontFamily: "Regular",
    color: colors.black,
    height: "100%",
    textAlignVertical: "center",
  },
  iconView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  offerContainerView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: (heightsize * 1) / 100,
    width: (widthsize * 90) / 100,
  },
  OfferTextView: {
    width: (widthsize * 20) / 100,
    height: (heightsize * 5) / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: (widthsize * 2) / 100,
    borderWidth: 1,
    borderColor: colors.textinput_border,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  OfferText: {
    fontSize: (widthsize * 2.8) / 100,
    fontFamily: "Regular",
    color: colors.black,
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: (heightsize * 2) / 100,
    width: (widthsize * 90) / 100,
    height: (heightsize * 5) / 100,
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
});

export default MaintenanceProduct;

import React, { useContext, useRef, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import CommonStyle from "@Theme/CommonStyle";
import { CustomTextInput, Layout } from "@CommonComponent/index";
import { GradientButton } from "@SubComponents/index";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Route } from "@Routes/AppRoutes";
import Toast from "react-native-simple-toast";
import Axios from "axios";
import { ApiConfig } from "@ApiConfig/index";

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 10,
    width: "100%",
  },
  buttonStyle:{
    marginBottom:20
  }
});

const SetProfileDetails = (props: any) => {
  const { email, otp } = props.route.params;
  const navigation = useNavigation();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobileNumber: "",
    pinCode: "",
    confirmPassword: "",
    password: "",
    isSecureTextEntry: true,
    isProcessing: false,
  });
  const {
    firstName,
    lastName,
    password,
    confirmPassword,
    address,
    mobileNumber,
    pinCode,
    isSecureTextEntry,
    isProcessing,
  } = state;

  const { flexContainer, marginTop, outer } = CommonStyle;

  const refConfirmPassword = useRef<any>();
  const refPassword = useRef<any>();

  const [seeFirstName, setSeeFirstName] = useState(false);
  const [seeLastName, setSeeLastName] = useState(false);
  const [seeAddress, setSeeAddress] = useState(false);
  const [seeMobileNumber, setSeeMobileNumber] = useState(false);
  const [seePinCode, setSeePinCode] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [confirmSeePassword, setConfirmSeePassword] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorMobileNumber, setErrorMobileNumber] = useState("");
  const [errorPinCode, setErrorPinCode] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const onChangeText = (text: string, type: string) => {
    setState({
      ...state,
      [type]: text,
    });
  };

  const manageProcessing = (isProcessingState: boolean) => {
    setState({
      ...state,
      isProcessing: isProcessingState,
    });
  };

  const onSignUp = async () => {
    manageProcessing(true);
    console.log(
      typeof firstName,
      typeof lastName,
      typeof email,
      typeof mobileNumber,
      typeof password,
      typeof pinCode,
      typeof address,
      typeof otp
    );

    if (
      !firstName.length &&
      !lastName.length &&
      !address.length &&
      !mobileNumber.length &&
      !password.length &&
      !pinCode.length
    ) {
      Toast.show("Please Fill all field", Toast.SHORT);
      manageProcessing(false);
      return 0;
    }

    if (!firstName.length) {
      setErrorFirstName("First name field is Empty");
      setSeeFirstName(true);
    } else {
      setSeeFirstName(false);
    }

    if (!lastName.length) {
      setErrorLastName("last name field is Empty");
      setSeeLastName(true);
    } else {
      setSeeLastName(false);
    }

    if (!address.length) {
      setErrorAddress("Address field is Empty");
      setSeeAddress(true);
    } else {
      setSeeAddress(false);
    }

    if (!mobileNumber.length) {
      setErrorMobileNumber("MobileNumber field is Empty");
      setSeeMobileNumber(true);
    } else {
      setSeeMobileNumber(false);
    }

    if (!password.length) {
      setErrorPassword("Password field is Empty");
      setSeePassword(true);
    } else {
      setSeePassword(false);
    }

    if (!confirmPassword.length) {
      setErrorConfirmPassword("ConfirmPassword field is Empty");
      setConfirmSeePassword(true);
    } else {
      setConfirmSeePassword(false);
    }

    if (!pinCode.length) {
      setErrorPinCode("Pincode field is Empty");
      setSeePinCode(true);
    } else {
      setSeePinCode(true);
    }

    if(!(password===confirmPassword)){
      setErrorConfirmPassword("Password and ConfirmPassword are not same");
      setConfirmSeePassword(true);
    } else {
      setConfirmSeePassword(false);
    }

    if (
      !firstName.length ||
      !lastName.length ||
      !address.length ||
      !mobileNumber.length ||
      !password.length ||
      !pinCode.length
    ) {
      manageProcessing(false);
      return 0;
    }

    if(!(password===confirmPassword)){
      setErrorConfirmPassword("Password and ConfirmPassword are not same");
      setConfirmSeePassword(true);
    } else {
      setConfirmSeePassword(false);
      manageProcessing(false);
      return 0;
    }

    try {
      Axios.post(ApiConfig.signUp, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_no: mobileNumber,
        password: password,
        role_id: "4",
        pincode: pinCode,
        address: address,
        center_name: "",
        otp: otp.toString(),
      })
        .then(function (response) {
          const { success, status } = response.data;

          if (success) {
            props.navigation.navigate(Route.LoginScreen);
            manageProcessing(false);
            Toast.show("Profile is Successfully Changed", Toast.SHORT);
          } else {
            Toast.show(status, Toast.SHORT);
            manageProcessing(false);
          }
        })
        .catch(function (error) {
          Toast.show("Somethings went wrong", Toast.SHORT);
          manageProcessing(false);
        });
    } catch (error) {
      Toast.show("Somethings went wrong", Toast.SHORT);
      manageProcessing(false);
    }
  };

  const goToNextScreen = (page: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: page }],
      })
    );
  };

  return (
    <Layout scrollable={true} padding={0} title={"Set Profile"} showBack={true}>
      <View style={flexContainer}>
        <View style={outer}>
          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, "firstName")}
            value={firstName}
            label={"First Name"}
            placeholder={""}
            maxLength={30}
            errorMassage={errorFirstName}
            hideLabel={seeFirstName}
            keyboardType={"email-address"}
            onSubmitEditing={Keyboard.dismiss}
          />

          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, "lastName")}
            value={lastName}
            label={"Last Name"}
            placeholder={""}
            maxLength={30}
            errorMassage={errorLastName}
            hideLabel={seeLastName}
            keyboardType={"email-address"}
            onSubmitEditing={Keyboard.dismiss}
          />

          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, "address")}
            value={address}
            label={"Address"}
            placeholder={""}
            maxLength={50}
            errorMassage={errorAddress}
            hideLabel={seeAddress}
            multiline={true}
            keyboardType={"email-address"}
            onSubmitEditing={Keyboard.dismiss}
          />

          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, "mobileNumber")}
            value={mobileNumber}
            label={"Mobile Number"}
            placeholder={""}
            maxLength={10}
            errorMassage={errorMobileNumber}
            hideLabel={seeMobileNumber}
            keyboardType={"numeric"}
            onSubmitEditing={Keyboard.dismiss}
          />

          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, "pinCode")}
            value={pinCode}
            label={"Pin Code"}
            placeholder={""}
            maxLength={6}
            errorMassage={errorPinCode}
            hideLabel={seePinCode}
            keyboardType={"numeric"}
            onSubmitEditing={Keyboard.dismiss}
          />

          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, "password")}
            value={password}
            label={"Password"}
            placeholder={""}
            isSecure={true}
            maxLength={8}
            maxChar={8}
            errorMassage={errorPassword}
            passwordHideLabel={seePassword}
            ref={refPassword}
            onSubmitEditing={Keyboard.dismiss}
          />

          <CustomTextInput
            onTextChange={(text: string) =>
              onChangeText(text, "confirmPassword")
            }
            value={confirmPassword}
            label={"Confirm Password"}
            placeholder={""}
            isSecure={true}
            maxLength={8}
            maxChar={8}
            errorMassage={errorConfirmPassword}
            passwordHideLabel={confirmSeePassword}
            ref={refConfirmPassword}
            onSubmitEditing={onSignUp}
          />

          <View style={styles.buttonStyle}>
            <GradientButton
              title={"Set Profile"}
              isProcessing={isProcessing}
              onPress={onSignUp}
              exStyle={marginTop}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default SetProfileDetails;

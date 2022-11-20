import React, { useContext, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { AppContext } from "@AppContext/index";
import CommonStyle from "@Theme/CommonStyle";
import {
  AssetImage,
  CustomText,
  CustomTextInput,
  Layout,
} from "@CommonComponent/index";
import { GradientButton, BottomView } from "@SubComponents/index";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Route } from "@Routes/AppRoutes";
import Toast from "react-native-simple-toast";
import { ApiConfig } from "@ApiConfig/index";
import Axios from "axios";
import { isValidEmail } from "@Utils/Helper";

const styles = StyleSheet.create({
  title: {
    marginVertical: 20,
    textAlign: "center",
  },
});

const EmailRegistration = (props: any) => {
  const { forgetPassword } = props.route.params;

  const { appTheme } = useContext(AppContext);
  const [seeEmail, setSeeEmail] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const navigation = useNavigation();
  const [state, setState] = useState({
    email: "",
    isProcessing: false,
  });
  const { email, isProcessing } = state;

  const { title } = styles;
  const { flexContainer, marginTop, outer } = CommonStyle;

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

  const onGoToOtp = async () => {
    manageProcessing(true);
    setSeeEmail(true);
    try {
      if (!email.length) {
        setErrorEmail("Please Enter Email Field");
        setSeeEmail(true);
        manageProcessing(false);
        return 0;
      }

      if (!isValidEmail(email)) {
        setErrorEmail("Please Enter Valid Email Formate");
        setSeeEmail(true);
        manageProcessing(false);
        return;
      }

      let option;

      if(!forgetPassword){
        option= "1";
      }else{
        option= "2";
      }

      Axios.post(ApiConfig.emailVerification, {
        email: email,
        option: option,
      })
        .then(function (response) {
          const { success, otp } = response.data;

          if (success) {
            console.log("OTP ", otp);
            if (forgetPassword) {
              props.navigation.navigate(Route.OtpScreen, {
                forgetPassword: true,
                email: email,
                otp: otp,
              });
              Toast.show("Otp send", Toast.SHORT);
            } else {
              props.navigation.navigate(Route.OtpScreen, {
                forgetPassword: false,
                email: email,
                otp: otp,
              });
              Toast.show("Otp send", Toast.SHORT);
            }
            manageProcessing(false);
          } else {
            setErrorEmail("Email is wrong");
            setSeeEmail(true);
            manageProcessing(false);
          }
        })
        .catch(function (error) {
          manageProcessing(false);
          Toast.show("Something went wrong", Toast.SHORT);
        });
    } catch (error) {
      manageProcessing(false);
      Toast.show("Something went wrong", Toast.SHORT);
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
    <Layout
      scrollable={true}
      padding={0}
      title={forgetPassword ? "Forgot Password" : "Sign Up"}
      showBack={true}
    >
      <View style={flexContainer}>
        <View style={outer}>
          <CustomText xxlarge style={[title, { color: appTheme.text }]}>
            Enter your email and we’ll send you a link to set your password.
          </CustomText>
          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, "email")}
            value={email}
            label={"Email Address"}
            placeholder={""}
            errorMassage={errorEmail}
            hideLabel={seeEmail}
            maxLength={40}
            isTick={isValidEmail(email)}
            keyboardType={"email-address"}
            onSubmitEditing={Keyboard.dismiss}
          />
          <GradientButton
            title={"Continue"}
            isProcessing={isProcessing}
            onPress={onGoToOtp}
            exStyle={marginTop}
          />
        </View>
        {forgetPassword ? (
          <></>
        ) : (
          <>
            <BottomView
              title={"Already have an account?"}
              subTitle={"LogIn here"}
              onSubTitle={() => props.navigation.goBack()}
            />
          </>
        )}
      </View>
    </Layout>
  );
};

export default EmailRegistration;

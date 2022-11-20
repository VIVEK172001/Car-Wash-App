import React, { useRef, useState } from "react";
import {
  View,
  Keyboard,
} from "react-native";
import CommonStyle from "@Theme/CommonStyle";
import {
  CustomTextInput,
  Layout,
} from "@CommonComponent/index";
import Axios from "axios";
import { ApiConfig } from "@ApiConfig/index";
import { GradientButton } from "@SubComponents/index";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import { Route } from "@Routes/AppRoutes";

const Otp = (props: any) => {
  const { email } = props.route.params;
  const [seePassword, setSeePassword] = useState(false);
  const [confirmSeePassword, setConfirmSeePassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const navigation = useNavigation();
  const [state, setState] = useState({
    confirmPassword: "",
    password: "",
    isSecureTextEntry: true,
    isProcessing: false,
  });
  const { confirmPassword, password, isProcessing } = state;

  const refConfirmPassword = useRef<any>();
  const refPassword = useRef<any>();

  const { flexContainer, outer, marginTop } = CommonStyle;

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

  const onGoToLogin = async () => {
    manageProcessing(true);
    if (
      !password.length &&
      !confirmPassword.length
    ) {
      Toast.show("Please Fill all field", Toast.SHORT);
      manageProcessing(false);
      return 0;
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

    if (
      !password.length ||
      !confirmPassword.length
    ) {
      manageProcessing(false);
      return 0;
    }

    if(!(password===confirmPassword)){
      setErrorConfirmPassword("Password and ConfirmPassword are not same");
      setConfirmSeePassword(true);
      return 0;
    } else {
      setConfirmSeePassword(false);
    }

    try {
      Axios.post(ApiConfig.forgotPassword, {
        email: email,
        password: password
      })
        .then(function (response) {
          const { success, status } = response.data;

          if (success) {
            props.navigation.navigate(Route.LoginScreen);
            Toast.show("Password is Successfully Changed", Toast.SHORT);
            manageProcessing(false);
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
    <Layout
      scrollable={true}
      padding={0}
      title={"Set Password"}
      showBack={true}
    >
      <View style={flexContainer}>
        <View style={outer}>
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
            onSubmitEditing={onGoToLogin}
          />

          <GradientButton
            title={"Done"}
            isProcessing={isProcessing}
            onPress={onGoToLogin}
            exStyle={marginTop}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Otp;

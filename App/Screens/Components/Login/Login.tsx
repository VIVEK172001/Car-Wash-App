import React, {
  forwardRef,
  useContext,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, Pressable, Keyboard } from "react-native";
import Toast from "react-native-simple-toast";
import { AppContext } from "@AppContext/index";
import CommonStyle from "@Theme/CommonStyle";
import {
  CustomText,
  CustomTextInput,
  Layout,
} from "@CommonComponent/index";
import { BottomView, GradientButton } from "@SubComponents/index";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { setItemInStorage } from "@Utils/Storage";
import { isValidEmail, isStrongPassword } from "@Utils/Helper";
import { Route } from "@Routes/AppRoutes";
import Axios from "axios";
import { ApiConfig } from "@ApiConfig/index";
import { useDispatch } from "react-redux";
import { setUser } from "@Actions/UserActions";
import { useAppSelector } from "@Stores/index";

interface userDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: number;
  pinCode: number;
  address: string;
  role_id: string | number;
}

const styles = StyleSheet.create({
  btnText: {
    textAlign: "right",
    paddingVertical: 5,
  },
  marginTop: {
    marginTop: 10,
    width: "100%",
  },
});

const Login = (props: any) => {
  //const user = useAppSelector(state => state.user);

  const { appTheme, translations } = useContext(AppContext);
  const [seeEmail, setSeeEmail] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    isSecureTextEntry: true,
    isProcessing: false,
  });
  const { email, password, isSecureTextEntry, isProcessing } = state;

  const refEmail = useRef<any>();
  const refPassword = useRef<any>();

  const { btnText, marginTop } = styles;
  const { outer, input, flexContainer } = CommonStyle;

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

  const onLogin = async () => {
    manageProcessing(true);
    setSeeEmail(true);
    setSeePassword(true);
    try {
      if (!email.length) {
        setErrorEmail("Please Enter Email Field");
        setSeeEmail(true);
        if (!password.length) {
          setErrorPassword("Please Enter Password Field");
          setSeePassword(true);
        }
        manageProcessing(false);
        return 0;
      } else {
        if (!password.length) {
          setErrorPassword("Please Enter Password Field");
          setSeePassword(true);
          manageProcessing(false);
          return 0;
        } else {
          setSeeEmail(false);
          setSeePassword(false);
        }
        manageProcessing(false);
      }

      if (!isValidEmail(email)) {
        setErrorEmail("Please Enter Valid Email Formate");
        setSeeEmail(true);
        if (!isStrongPassword(password)) {
          setErrorPassword("Please Enter Valid Password Formate");
          setSeePassword(true);
        }
        manageProcessing(true);
        return 0;
      } else {
        if (!isStrongPassword(password)) {
          setErrorPassword("Please Enter Valid Password Formate");
          setSeePassword(true);
          manageProcessing(true);
          return 0;
        } else {
          setSeeEmail(false);
          setSeePassword(false);
        }
      }

      Axios.post(ApiConfig.login, {
        username: email,
        password: password,
      })
        .then(async function (response) {
          const { success, data, token } = response.data;
          if (success) {
            const userDetails: userDetails = {
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email,
              phoneNo: data.phone_no,
              pinCode: data.pincode,
              address: data.address,
              role_id: data.role_id,
            };
            dispatch(setUser({ user: userDetails }));
            await setItemInStorage("token", token);
            Toast.show("Successfully Login", Toast.SHORT);
            data.role_id === 4
              ?
               navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: Route.HomeScreen }],
                  })
                )
              : 
                props.navigation.navigate(Route.WorkerScreen);
          } else {
            setErrorEmail("Email is wrong");
            setSeeEmail(true);
            setErrorPassword("Password is wrong");
            setSeePassword(true);
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

  return (
    <Layout scrollable={true} padding={0} title={"Login"}>
      <View style={flexContainer}>
        <View style={outer}>
          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, "email")}
            value={email}
            label={"Email Address"}
            placeholder={""}
            errorMassage={errorEmail}
            //hideLabel={isValidEmail(email)&& (email.length)? false : seeEmail}
            hideLabel={seeEmail}
            maxLength={40}
            isTick={isValidEmail(email)}
            keyboardType={"email-address"}
            onSubmitEditing={Keyboard.dismiss}
          />
          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, "password")}
            value={password}
            label={"Password"}
            placeholder={""}
            isSecure={true}
            maxLength={8}
            errorMassage={errorPassword}
            passwordHideLabel={seePassword}
            maxChar={8}
            ref={refPassword}
            onSubmitEditing={onLogin}
          />
          <Pressable
            onPress={() => {
              props.navigation.navigate(Route.EmailRegistrationScreen, {
                forgetPassword: true,
              });
            }}
          >
            <CustomText style={[btnText, { color: appTheme.lightText }]}>
              Forgot Password?
            </CustomText>
          </Pressable>
          <GradientButton
            title={"Log in"}
            isProcessing={isProcessing}
            onPress={onLogin}
            exStyle={marginTop}
          />
        </View>
        <BottomView
          title={"Need to create an account?"}
          subTitle={"Sign up here"}
          onSubTitle={() => {
            props.navigation.navigate(Route.EmailRegistrationScreen, {
              forgetPassword: false,
            });
          }}
        />
      </View>
    </Layout>
  );
};

export default Login;

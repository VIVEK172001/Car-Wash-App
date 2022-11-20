import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable
} from 'react-native';
import { CustomText, Layout } from '@CommonComponent/index';
import CommonStyle from '@Theme/CommonStyle';
import { Route } from '@Routes/AppRoutes';
import Toast from 'react-native-simple-toast';
import { AppContext } from '@AppContext/index';
import { GradientButton } from '@SubComponents/index';
import { ApiConfig } from '@ApiConfig/index';
import Axios from "axios";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  longTextMarginTop:{
    marginTop:24,
    textAlign: 'center',
    paddingHorizontal:40
  },
  buttonContainer:{
    marginTop:70,
    width:'100%',
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    marginHorizontal:15,
    borderBottomWidth: 2,
    textAlign: 'center',
  },
  resetOtp:{
    marginTop:24,
    textAlign: 'center'
  },
  codeFieldRoot: {marginTop: 20},
  forTextAlign:{
    textAlign: 'center'
  }
});

const Otp = (props:any) => {

  const {forgetPassword,email,otp} = props.route.params;
  
  const { appTheme } = useContext(AppContext);
  const [trueOTP, setTrueOTP] = useState(otp);
  const [state, setState] = useState({
    isProcessing: false,
  });

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 4});
  const [propsS, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { isProcessing } = state;
  const { buttonContainer, longTextMarginTop ,resetOtp, forTextAlign, cell, codeFieldRoot} = styles;
  const { flexContainer, fontWeights, rowDirection ,outer ,marginTop} = CommonStyle;

  const manageProcessing = (isProcessingState: boolean) => {
    setState({
      ...state,
      isProcessing: isProcessingState,
    });
  };
  
  const goSignIn = async () => {
    manageProcessing(true);
    try{
      if(trueOTP === parseInt(value)){        
        Toast.show("OTP Verified", Toast.SHORT);
        if(forgetPassword){
          props.navigation.navigate(Route.SetPasswordScreen,{
            email:email,
            otp:trueOTP
          })
          manageProcessing(false);
        }else{
          props.navigation.navigate(Route.SetProfileDetailsScreen,{
            email:email,
            otp:trueOTP
          })
          manageProcessing(false);
        }
      }else{
        Toast.show("Wrong OTP", Toast.SHORT);
        setValue('');
        manageProcessing(false);
      }
    } catch (error) {
      Toast.show("Something went wrong", Toast.SHORT);
      manageProcessing(false);
    }
  };

  const resendOtp=async()=>{
    try {
      Axios.post(ApiConfig.emailVerification, {
        email:email,
        option:"1"
      })
      .then(function (response) {
        const {success,otp} =response.data;
        
        if(success){
          setTrueOTP(otp);
          Toast.show("Otp send", Toast.SHORT)
          manageProcessing(false);
        }else{
          manageProcessing(false);
        }
      })
      .catch(function (error) {
        manageProcessing(false);
        Toast.show(error.toString(), Toast.SHORT);
      });
    } catch (error) {
      
    }
  }

  return (
    <Layout scrollable={true} padding={0} title={'Verify OTP'} showBack={true}>
         <View style={flexContainer}>
            <View style={outer}>
                <CustomText xxxlarge style={[fontWeights,marginTop,forTextAlign]}>Verify Your OTP</CustomText>
                <CustomText xlarge style={[longTextMarginTop,forTextAlign]}>{"Enter the OTP sent to "+email}</CustomText>
                <CodeField
                    ref={ref}
                    {...propsS}
                    value={value}
                    onChangeText={setValue}
                    cellCount={4}
                    rootStyle={codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[cell,{color:appTheme.lightText,borderColor: appTheme.lightText}, isFocused && {borderColor:appTheme.boarderOnboarding}]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                    )}
                />
                <View style={rowDirection}>
                    <CustomText large style={[resetOtp,{opacity:0.5}]}>Didnt you receive the OTP? </CustomText>
                    <Pressable onPress={resendOtp}><CustomText large style={[resetOtp,{color:appTheme.boarderOnboarding}]}>Resend OTP.</CustomText></Pressable>
                </View>
                <GradientButton
                  title={forgetPassword?'Set Password':'Set Profile'}
                  isProcessing={isProcessing}
                  onPress={()=>goSignIn()}
                  exStyle={buttonContainer}
                />
            </View>
         </View>
      </Layout>
  );
};

export default Otp;


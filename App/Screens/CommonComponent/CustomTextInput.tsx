/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInputFocusEventData,
} from 'react-native';
import { CustomText, AssetImage } from '@CommonComponent/index';
import { AppContext } from '@AppContext/index';
import AppImages from '@Theme/AppImages';
import CommonStyle from '@Theme/CommonStyle';
import { fontSizes } from '@Utils/Constant';

interface CustomTextInputProps {
  viewStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  onTextChange: (text: string) => void;
  error?: string;
  value?: string | undefined;
  placeholder?: string;
  isSecure?: boolean;
  label?: string;
  isTick?:boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  multiline?: boolean;
  hideLabel?: boolean;
  onFocus?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
  maxChar?: number;
  maxLength?: number;
  editable?: boolean;
  otpInput?:boolean;
  ref?:any,
  passwordHideLabel?:boolean
  errorMassage?:string
}

const CustomTextInput = React.forwardRef(
  (
    {
      viewStyle,
      containerStyle,
      onTextChange,
      error,
      value,
      placeholder,
      isSecure = false,
      isTick=false,
      label,
      keyboardType,
      multiline,
      hideLabel = false,
      onSubmitEditing,
      onFocus,
      maxChar = 0,
      maxLength = undefined,
      editable = true,
      otpInput = false,
      passwordHideLabel = false,
      errorMassage='',
      ...props
    }: CustomTextInputProps,
    ref: any,
  ) => {
  const { appTheme } = useContext(AppContext);
  const [textValue, setTextValue] = useState(value);
  const [isShowPassword, setShowPassword] = useState(true);

  const { input, firstMarginTops, secondMarginTops, flexContainer, logoStyle, fontWeights, flex1, signMargin,logoText, logoTextStyle} = CommonStyle;
  useEffect(() => {
    if (value !== textValue) {
      setTextValue(value);
    }
  }, [value]);

  const onShowPassword = () => {
    setShowPassword(!isShowPassword);
  };

  const constraints = {
    emailAddress: {
      presence: {
        allowEmpty: false,
        message: "^Please enter an email address"
      },
      email: {
        message: "^Please enter a valid email address"
      }
    },
  };

  return (
    <View style={[{ marginBottom: 5 }, viewStyle]}>
      {!hideLabel && (
        (!otpInput)?(
          <CustomText
            large
            style={[{ color: appTheme.lightText, marginTop: 0 }]}>
            {""}
          </CustomText>
        ):(
          <CustomText
            large
            style={[{ color: appTheme.lightText, marginTop: 15, opacity:0.5}]}>
            {""}
          </CustomText>
        )
      )||
        <CustomText
          large
          style={[{ color: appTheme.red, marginTop: 15 }]}>
          {""}
        </CustomText>
      }
      <View
        style={[
          style.container,
          {
            borderColor: appTheme.textContainer,
            alignItems: (multiline && 'flex-start') || 'center',
            paddingTop: (multiline && 10) || 0,
          },
          containerStyle,
        ]}>
        <TextInput
          {...props}
          style={[
            {
              borderBottomColor: appTheme.themeColor,
              color: appTheme.text,
              height: (multiline && 100) || 50,
              textAlignVertical: (multiline && 'top') || 'center',
              textAlign:((otpInput) && 'center' || 'auto')
            },
            style.textInputContainer,
          ]}
          multiline={multiline}
          numberOfLines={5}
          placeholder={
            (placeholder && placeholder) || `Enter your ${label!.toLowerCase()}`
          }
          editable={editable}
          maxLength={maxLength}
          autoCapitalize={'none'}
          ref={ref}
          returnKeyType={'next'}
          secureTextEntry={isSecure && isShowPassword}
          keyboardType={keyboardType}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor={appTheme.textBorder}
          onChangeText={text => {
            setTextValue(text);
            onTextChange(text);
          }}
          underlineColorAndroid={undefined}
          value={textValue}
          onFocus={onFocus}
        />

        {isSecure && (
          <TouchableOpacity onPress={onShowPassword} activeOpacity={1}>
            <View
              style={{
                borderBottomColor: appTheme.border,
              }}>
              <AssetImage
                resizeMode={'contain'}
                source={
                  (isShowPassword && AppImages.passwordClosed) ||
                  AppImages.passwordOpen
                }
                imageStyle={style.inputImg}
              />
            </View>
          </TouchableOpacity>
        )}
        {isTick && (
          <TouchableOpacity onPress={onShowPassword} activeOpacity={1}>
            <View
              style={{
                borderBottomColor: appTheme.border,
              }}>
              <AssetImage
                resizeMode={'contain'}
                source={
                  (isShowPassword && AppImages.tickInput)
                }
                imageStyle={style.inputImg}
              />
            </View>
          </TouchableOpacity>
        ) }
      </View>
      {!hideLabel && (
        <></>
      )||
      <CustomText
        medium
        style={{ color: 'red', margin: 5 }}>{errorMassage}
      </CustomText>
      }
      {!passwordHideLabel && (
        <></>
      )||
      <CustomText
        medium
        style={{ color: 'red', margin: 5 }}>{errorMassage}
      </CustomText>
      }
      {(maxChar && (
        <CustomText
          medium
          style={{
            color:
              ((textValue?.length || 0) > maxChar && appTheme.red) ||
              appTheme.textBorder,
            margin: 5,
          }}>{`${textValue?.length || 0}/${maxChar} character.`}</CustomText>
      )) ||
        null}
    </View>
  );
}
)

const style = StyleSheet.create({
  textInputContainer: {
    fontSize: fontSizes.medium,
    flex: 1,
    justifyContent: 'center',
    marginLeft:10
  },
  container: {
    borderWidth: 1,
    borderRadius:5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputImg: {
    width: 20,
    height: 20,
    marginRight:5,
  },
});

export { CustomTextInput };

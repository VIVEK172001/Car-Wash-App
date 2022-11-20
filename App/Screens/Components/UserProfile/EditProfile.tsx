import React, {useState} from 'react';
import {View, Keyboard} from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import {CustomTextInput, Layout} from '@CommonComponent/index';
import {GradientButton} from '@SubComponents/index';
import {useNavigation} from '@react-navigation/native';
import {Route} from '@Routes/AppRoutes';
import Toast from 'react-native-simple-toast';
import Axios from 'axios';
import {ApiConfig} from '@ApiConfig/index';
import {useAppSelector} from '@Stores/index';
import {useDispatch} from 'react-redux';
import {setUser} from '@Actions/UserActions';
interface userDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: number;
  pinCode: number;
  address: string;
  role_id: string | number;
}

const EditProfile = (props: any) => {
  const dispatch = useDispatch();
  const user = useAppSelector(state => state.user);
  const navigation = useNavigation();
  const [state, setState] = useState({
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    address: user.user.address,
    mobileNumber: user.user.phoneNo.toString(),
    pinCode: user.user.pinCode.toString(),
    isProcessing: false,
  });
  const {
    firstName,
    lastName,
    address,
    mobileNumber,
    pinCode,
    isProcessing,
  } = state;
  console.log(user.user);
  const {flexContainer, marginTop, outer} = CommonStyle;
  const [seeFirstName, setSeeFirstName] = useState(false);
  const [seeLastName, setSeeLastName] = useState(false);
  const [seeAddress, setSeeAddress] = useState(false);
  const [seeMobileNumber, setSeeMobileNumber] = useState(false);
  const [seePinCode, setSeePinCode] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorAddress, setErrorAddress] = useState('');
  const [errorMobileNumber, setErrorMobileNumber] = useState('');
  const [errorPinCode, setErrorPinCode] = useState('');

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

  const onSave = async () => {
    manageProcessing(true);
    console.log(
      typeof firstName,
      typeof lastName,
      typeof mobileNumber,
      typeof pinCode,
      typeof address,
    );

    if (
      !firstName.length &&
      !lastName.length &&
      !address.length &&
      !mobileNumber.length &&
      !pinCode.length
    ) {
      return Toast.show('Please Fill all field', Toast.SHORT);
    }

    if (!firstName.length) {
      setErrorFirstName('First name field is Empty');
      setSeeFirstName(true);
    } else {
      setSeeFirstName(false);
    }

    if (!lastName.length) {
      setErrorLastName('last name field is Empty');
      setSeeLastName(true);
    } else {
      setSeeLastName(false);
    }

    if (!address.length) {
      setErrorAddress('Address field is Empty');
      setSeeAddress(true);
    } else {
      setSeeAddress(false);
    }

    if (!mobileNumber.length) {
      setErrorMobileNumber('MobileNumber field is Empty');
      setSeeMobileNumber(true);
    } else {
      setSeeMobileNumber(false);
    }

    if (!pinCode.length) {
      setErrorPinCode('Pincode field is Empty');
      setSeePinCode(true);
    } else {
      setSeePinCode(true);
      false;
    }
    if (
      !firstName.length ||
      !lastName.length ||
      !address.length ||
      !mobileNumber.length ||
      !pinCode.length
    ) {
      manageProcessing(false);
      return 0;
    }

    try {
      Axios.post(ApiConfig.updateProfile, {
        first_name: firstName,
        last_name: lastName,
        phone_no: mobileNumber,
        pincode: pinCode,
        address: address,
      })
        .then(function (response) {
          const {success, status} = response.data;

          if (success) {
            const userDetails: userDetails = {
              firstName: firstName,
              lastName: lastName,
              phoneNo: mobileNumber,
              pinCode: pinCode,
              address: address,
              role_id: user.user.role_id,
              email: user.user.email,
            };
            dispatch(setUser({user: userDetails}));
            props.navigation.navigate(Route.HomeScreen);
            manageProcessing(false);
          } else {
            Toast.show(status, Toast.SHORT);
            manageProcessing(false);
          }
        })
        .catch(function (error) {
          Toast.show(error.toString(), Toast.SHORT);
          manageProcessing(false);
        });
    } catch (error) {
      Toast.show('Somethings went wrong', Toast.SHORT);
      manageProcessing(false);
    }
  };

  return (
    <Layout
      scrollable={true}
      padding={0}
      showBack={true}
      title={'Edit Profile'}>
      <View style={flexContainer}>
        <View style={outer}>
          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, 'firstName')}
            value={firstName}
            label={'First Name'}
            placeholder={''}
            maxLength={30}
            errorMassage={errorFirstName}
            hideLabel={seeFirstName}
            onSubmitEditing={Keyboard.dismiss}
          />

          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, 'lastName')}
            value={lastName}
            label={'Last Name'}
            placeholder={''}
            maxLength={30}
            errorMassage={errorLastName}
            hideLabel={seeLastName}
            onSubmitEditing={Keyboard.dismiss}
          />

          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, 'address')}
            value={address}
            label={'Address'}
            multiline={true}
            placeholder={''}
            maxLength={50}
            errorMassage={errorAddress}
            hideLabel={seeAddress}
            onSubmitEditing={Keyboard.dismiss}
          />

          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, 'mobileNumber')}
            value={mobileNumber}
            label={'Mobile Number'}
            placeholder={''}
            maxLength={10}
            errorMassage={errorMobileNumber}
            hideLabel={seeMobileNumber}
            keyboardType={'numeric'}
            onSubmitEditing={Keyboard.dismiss}
          />

          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, 'pinCode')}
            value={pinCode}
            label={'Pin Code'}
            placeholder={''}
            maxLength={6}
            errorMassage={errorPinCode}
            hideLabel={seePinCode}
            keyboardType={'numeric'}
            onSubmitEditing={Keyboard.dismiss}
          />

          <GradientButton
            title={'Edit & Save Profile'}
            isProcessing={isProcessing}
            onPress={onSave}
            exStyle={marginTop}
          />
        </View>
      </View>
    </Layout>
  );
};

export default EditProfile;

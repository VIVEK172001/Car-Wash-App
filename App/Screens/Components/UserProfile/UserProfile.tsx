import React, {useContext,useState} from 'react';
import {View, StyleSheet, Pressable, Image, Alert} from 'react-native';
import {AppContext} from '@AppContext/index';
import CommonStyle from '@Theme/CommonStyle';
import {CustomText, Layout} from '@CommonComponent/index';
import {ButtonComponent, GradientButton} from '@SubComponents/index';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AppImages from '@Theme/AppImages';
import { userLogout } from '@Actions/UserActions';
import {Route} from '@Routes/AppRoutes';
import {useAppSelector} from '@Stores/index';
import { removeStoreItem } from '@Utils/Storage';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 0,
    width: '100%',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 190,
  },
  topBackGround: {
    height: 250,
  },
  buttonBottom: {
    bottom: 0,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName:{
    marginTop: 80, 
    alignSelf: 'center'
  }
});

const UserProfile = (props: any) => {
  const user = useAppSelector(state => state.user);
  const {appTheme} = useContext(AppContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {profileName, marginTop, profileImage, topBackGround, buttonBottom} =styles;
  const {ProfileButton, flexContainer} = CommonStyle;

  const onEditProfile = async () => {
    navigation.navigate(Route.EditProfileScreen as never);
  };

  const logout = () => {
    Alert.alert(
      '',
      'Do you want to logout?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: onLogout,
        },
      ],
      { cancelable: true },
    );
  };

  const onLogout=async()=>{
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Route.LoginScreen }],
      }),
    );
    dispatch(userLogout());
    await removeStoreItem('token');
  }
  return (
    <Layout scrollable={true} padding={0}>
      <View style={flexContainer}>
        <View
          style={[
            topBackGround,
            {backgroundColor: appTheme.themePurple},
          ]}></View>
        <Image source={{uri: AppImages.slider1}} style={profileImage} />
        <View style={profileName}>
          <CustomText xxlarge>
            { user.user.firstName + ' ' + user.user.lastName}
          </CustomText>
        </View>
        <View style={ProfileButton}>
          <ButtonComponent
            title={'Edit Profile'}
            onPress={onEditProfile}
            borderRadius={28}
          />
        </View>
        <View style={ProfileButton}>
          <GradientButton
            title={'See History'}
            onPress={onEditProfile}
            exStyle={marginTop}
          />
        </View>
      </View>
      <Pressable
        onPress={logout}
        style={[buttonBottom, {backgroundColor: appTheme.themePurple}]}>
        <CustomText xlarge style={{color: appTheme.buttonText}}>
          Log Out
        </CustomText>
      </Pressable>
    </Layout>
  );
};

export default UserProfile;

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import AppImages from '@Theme/AppImages';
import {GradientButton} from '@SubComponents/AppButton';
import {Route} from '@Routes/AppRoutes';
import {useNavigation} from '@react-navigation/native';

const Completed = () => {
  const navigation = useNavigation();
  const navigateToWorkScreen = () => {
    navigation.navigate(Route.WorkerScreen as never);
  };
  return (
    <View style={styles.mainContainer}>
      <Image source={{uri: AppImages.completed}} style={styles.complete} />
      <Text style={styles.message}>Task Completed!</Text>
      <GradientButton
        title={'Head Over To Remaining Tasks!'}
        onPress={navigateToWorkScreen}></GradientButton>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  complete: {
    height: 100,
    width: 100,
    margin: '5%',
  },
  message: {
    margin: '5%',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default Completed;

import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.mainScreen}>
      <ActivityIndicator size="large" color="#7F3DFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;

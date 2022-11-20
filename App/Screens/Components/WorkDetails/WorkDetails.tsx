import {AppContext} from '@AppContext/index';
import React, {Props, useContext, useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonStyle from '@Theme/CommonStyle';
import {NavigationBar} from '@CommonComponent/NavigationBar';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {Route} from '@Routes/AppRoutes';

interface DataFormat {
  id: number;
  status: number;
  address: string;
  phone: string;
  carType: string;
  cleanType: string;
  firstname: string;
  lastname: string;
}

const Worker = (props: any) => {
  const obj = props.route.params.obj;
  const title = props.route.params.title;
  const navigation = useNavigation();
  const {appTheme} = useContext(AppContext);
  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        {backgroundColor: appTheme.background},
      ]}>
      <NavigationBar
        showBack={false}
        title={title.slice(0, -1) + ' ID: ' + obj.id.toString()}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Name</Text>
        <Text style={styles.detail}>
          {obj.firstname} {obj.lastname}
        </Text>
        <View style={styles.line}></View>
        <Text style={styles.title}>Address</Text>
        <Text style={[styles.detail, styles.address]}>{obj.address}</Text>
        <View style={styles.line}></View>
        <Text style={styles.title}>Phone Number</Text>
        <Text style={styles.detail}>{obj.phone}</Text>
        <View style={styles.line}></View>
        <Text style={styles.title}>Car Type</Text>
        <Text style={styles.detail}>{obj.carType}</Text>
        <View style={styles.line}></View>
        <Text style={styles.title}>Cleaning Type</Text>
        <Text style={styles.detail}>{obj.cleanType}</Text>
        <View style={styles.line}></View>
        <Pressable
          onPress={() => {
            console.log('Send Req to change');
            if (obj.status > 50)
              navigation.navigate(Route.CompletedScreen as never);
          }}
          style={
            obj.status > 50
              ? [styles.button, styles.buttonMarkAsComplete]
              : [styles.button, styles.buttonInit]
          }>
          <Text style={styles.buttonText}>
            {obj.status > 50 ? 'Mark As Complete' : 'Initiate'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: '5%',
    alignContent: 'center',
    justifyContent: 'center',
    padding: '5%',
    borderRadius: 20,
    backgroundColor: '#7F3FFF',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  detail: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  address: {
    fontSize: 20,
  },
  line: {
    marginVertical: '2%',
    borderWidth: 0.2,
    borderColor: 'white',
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    padding: '3%',
    marginLeft: 'auto',
    marginVertical: '2%',
  },
  buttonInit: {
    backgroundColor: '#00A86B',
  },
  buttonMarkAsComplete: {
    backgroundColor: '#FD3C4A',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Worker;

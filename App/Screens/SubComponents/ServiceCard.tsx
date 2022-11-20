import {AppContext} from '@AppContext/index';
import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonStyle from '@Theme/CommonStyle';
import {NavigationBar} from '@CommonComponent/NavigationBar';
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

const ServiceCard = (props: any) => {
  const obj = props.obj;
  console.log(obj);
  const {appTheme} = useContext(AppContext);
  if (!obj.end) {
    return (
      <SafeAreaView
        style={[
          CommonStyle.flexContainer,
          {backgroundColor: appTheme.background},
        ]}>
        <View style={[styles.mainContainer]}>
          <Text style={styles.title}>Date of Appointment</Text>
          <Text style={styles.detail}>{obj.date.slice(0, 10)}</Text>
          <View style={styles.line}></View>
          <Text style={styles.title}>Time of Appointment</Text>
          <Text style={styles.detail}>{obj.time.slice(11, 19)}</Text>
          <View style={styles.line}></View>
          <Text style={styles.title}>Service Center Name</Text>
          <Text style={styles.detail}>{obj.serviceCenterName}</Text>
          <View style={styles.line}></View>
          <Text style={styles.title}>Service Center Address</Text>
          <Text style={[styles.detail, styles.address]}>
            {obj.serviceCenterAdd}
          </Text>
          <View style={styles.line}></View>
          <Text style={styles.title}>Car Type</Text>
          <Text style={styles.detail}>{obj.carType}</Text>
          <View style={styles.line}></View>
          <Text style={styles.title}>Cleaning Type</Text>
          <Text style={styles.detail}>{obj.cleanType}</Text>
          <View style={styles.line}></View>
          <Text style={styles.title}>Billing Amount</Text>
          <Text style={styles.detail}>{obj.bill}</Text>
          <View style={styles.line}></View>
          <Text style={styles.title}>Status</Text>
          <Text style={styles.detail}>{obj.status}</Text>
          <View style={styles.line}></View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        {backgroundColor: appTheme.background},
      ]}>
      <View style={[styles.mainContainer]}>
        <Text style={styles.title}>Start Date</Text>
        <Text style={styles.detail}>{obj.start.slice(0, 10)}</Text>
        <View style={styles.line}></View>
        <Text style={styles.title}>End Date</Text>
        <Text style={styles.detail}>{obj.end.slice(0, 10)}</Text>
        <View style={styles.line}></View>
        <Text style={styles.title}>Address</Text>
        <Text style={[styles.detail, styles.address]}>{obj.address}</Text>
        <View style={styles.line}></View>
        <Text style={styles.title}>Car Type</Text>
        <Text style={styles.detail}>{obj.carType}</Text>
        <View style={styles.line}></View>
        <Text style={styles.title}>Cleaning Type</Text>
        <Text style={styles.detail}>{obj.cleanType}</Text>
        <View style={styles.line}></View>
        <Text style={styles.title}>Billing Amount</Text>
        <Text style={styles.detail}>{obj.bill}</Text>
        <View style={styles.line}></View>
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
    backgroundColor: '#7F3FFF',
    borderRadius: 20,
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
});

export default ServiceCard;

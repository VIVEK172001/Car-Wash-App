import {AppContext} from '@AppContext/index';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonStyle from '@Theme/CommonStyle';
import Work from '@SubComponents/Work';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import ServiceCard from '@SubComponents/ServiceCard';
import LoadingScreen from '@CommonComponent/LoadingScreen';

const Subscriptions = (props: {data: object[]}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>Your Current Subscriptions</Text>
      {props.data.map((item: any) => {
        return <ServiceCard obj={item} key={item.id} />;
      })}
    </View>
  );
};
const Appointments = (props: {data: object[]}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>Your Upcoming Appointments</Text>
      {props.data.map((item: any) => {
        return <ServiceCard obj={item} key={item.id} />;
      })}
    </View>
  );
};
const ActiveServices = () => {
  const {appTheme} = useContext(AppContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    axios
      .get('https://629f315c8b939d3dc291e14b.mockapi.io/activeServices')
      .then(res => {
        setSubscriptions(res.data);
        setAppointments(res.data);
        setLoading(false);
      });
  };
  useEffect(fetchData, []);
  let SubList = <></>,
    AppList = <></>;
  if (loading) return <LoadingScreen />;
  else {
    if (subscriptions.length != 0)
      SubList = <Subscriptions data={subscriptions} />;
    if (appointments.length != 0)
      AppList = <Appointments data={appointments} />;
    return (
      <SafeAreaView
        style={[
          CommonStyle.flexContainer,
          {backgroundColor: appTheme.background},
        ]}>
        <ScrollView>
          {SubList}
          {AppList}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {fontSize: 25, fontWeight: 'bold'},
});

export default ActiveServices;

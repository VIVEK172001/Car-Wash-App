import {AppContext} from '@AppContext/index';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonStyle from '@Theme/CommonStyle';
import Work from '@SubComponents/Work';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import LoadingScreen from '@CommonComponent/LoadingScreen';

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

const Tasks = (props: {obj: DataFormat; title: string}) => {
  if (1 == 1) {
    return <Work obj={props.obj} title={props.title} />;
  }
  return (
    <View style={styles.doneContainer}>
      <Text style={styles.doneMessage}>✅ Done With Today's {props.title}</Text>
    </View>
  );
};

const Worker = () => {
  const {appTheme} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    axios
      .get('https://629f315c8b939d3dc291e14b.mockapi.io/subscriptions',{})
      .then(res => {
        setData(res.data);
        setLoading(false);
      });
  };
  useEffect(fetchData, []);

  if (loading) return <LoadingScreen />;
  else
    return (
      <SafeAreaView
        style={[
          CommonStyle.flexContainer,
          {backgroundColor: appTheme.background},
        ]}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <View>
              <Text style={styles.header}>Today's Subscription Works</Text>
            </View>
            {data.map((item: DataFormat) => {
              return <Tasks obj={item} title={'Subscriptions'} key={item.id} />;
            })}
          </View>
          <View style={styles.mainContainer}>
            <View>
              <Text style={styles.header}>Today's Appointment Works</Text>
            </View>
            {data.map((item: DataFormat) => {
              return <Tasks obj={item} title={'Appointments'} key={item.id} />;
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: '5%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  header: {fontSize: 25, fontWeight: 'bold'},
  doneContainer: {
    width: '100%',
    marginTop: '2%',
  },
  doneMessage: {
    fontSize: 20,
    fontWeight: '400',
  },
});

export default Worker;

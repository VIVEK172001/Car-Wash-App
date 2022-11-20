import {AppContext} from '@AppContext/index';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonStyle from '@Theme/CommonStyle';
import Work from '@SubComponents/Work';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import LoadingScreen from '@CommonComponent/LoadingScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Centers = (props: {obj: any}) => {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.centername}>{props.obj.centerName}</Text>
      <Icon name="arrow-right-circle" color="white" size={25} />
    </Pressable>
  );
};

const CenterDisplay = () => {
  const {appTheme} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    axios
      .get('https://629f315c8b939d3dc291e14b.mockapi.io/centers')
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
            {data.map((item: any) => {
              return <Centers obj={item} key={item.id} />;
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
  container: {
    padding: '4%',
    marginVertical: '3%',
    borderRadius: 20,
    backgroundColor: '#7F3FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centername: {fontSize: 20, fontWeight: 'bold', color: 'white'},
});
export default CenterDisplay;

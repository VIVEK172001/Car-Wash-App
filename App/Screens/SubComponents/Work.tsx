import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Route} from '@Routes/AppRoutes';
import {useNavigation} from '@react-navigation/native';

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

const Work = (props: {obj: DataFormat; title: string}) => {
  const navigation = useNavigation();
  const expandWork = () => {
    navigation.navigate(
      Route.WorkDetailsScreen as never,
      {
        obj: props.obj,
        title: props.title,
      } as never,
    );
  };
  return (
    <Pressable onPress={expandWork} style={styles.work}>
      <View>
        <Text style={styles.info}>
          {props.title.slice(0, -1)} ID :{props.obj.id}
        </Text>
        <Pressable
          onPress={() => {
            console.log('Send Req to change');
            if (props.obj.status > 50)
              navigation.navigate(Route.CompletedScreen as never);
          }}
          style={
            props.obj.status > 50
              ? [styles.button, styles.buttonMarkAsComplete]
              : [styles.button, styles.buttonInit]
          }>
          <Text style={styles.buttonText}>
            {props.obj.status > 50 ? 'Mark As Complete' : 'Initiate'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  work: {
    width: '100%',
    marginVertical: '5%',
    padding: '5%',
    backgroundColor: '#7F3FFF',
    borderRadius: 25,
  },
  info: {
    fontSize: 20,
    marginBottom: '2%',
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    marginVertical: '1%',
    backgroundColor: '#00A86B',
    alignItems: 'center',
    borderRadius: 10,
    padding: '2%',
    paddingHorizontal: '3%',
    marginLeft: 'auto',
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

export default Work;

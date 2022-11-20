import React, {useContext, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  Button,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import {AppContext} from '@AppContext/index';
import CommonStyle from '@Theme/CommonStyle';
import {CustomTextInput, Layout} from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';
import {GradientButton} from '@SubComponents/index';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {setItemInStorage} from '@Utils/Storage';
import {Route} from '@Routes/AppRoutes';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {fontSizes} from '@Utils/Constant';
import {Dropdown} from 'react-native-element-dropdown';
const data = [
  {label: 'Hatchback', value: '1'},
  {label: 'Sedan', value: '2'},
  {label: 'SUV', value: '3'},
  {label: 'Crossover', value: '4'},
  {label: 'Convertible', value: '5'},
];

const serviceData = [
  {label: 'Exterior Cleaning', value: '1'},
  {label: 'Full Cleaning', value: '2'},
];
const BookAppointment = (props: any) => {
  const {appTheme, translations} = useContext(AppContext);
  const [seeEmail, setSeeEmail] = useState(false);
  const navigation = useNavigation();
  const [state, setState] = useState({
    cityName: '',
    isSecureTextEntry: true,
    isProcessing: false,
  });
  const {cityName, isSecureTextEntry, isProcessing} = state;

  const {input, flexContainer, marginTop, outer} = CommonStyle;

  const inputStyle = [
    input,
    {
      color: appTheme.text,
      borderColor: appTheme.border,
    },
  ];

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

  const onSeeCenters = async () => {
    try {
      const difference = date.getTime() - new Date().getTime();
      if (difference < 0) {
        Alert.alert("You can't book the appointment in past!");
        return 0;
      }
      if (date.getHours() > 17 || date.getHours() < 9) {
        Alert.alert('Please enter time between 9AM to 5PM!');
        return 0;
      }
      if (!cityName) {
        Alert.alert("Please enter your city's name");
        return 0;
      }
      if (carDropDownValue == null) {
        Alert.alert('Please select your car type!!');
        return 0;
      }
      if (serviceDropDown == null) {
        Alert.alert('Please select your service type!!');
        return 0;
      }

      props.navigation.navigate(Route.HomeScreen);

      // Field Validation
      // Make api call ans store user in redux and token in Storage
      // goToNextScreen(Route.HomeScreen);
      // await setItemInStorage('token', 'set login token');
    } catch (error) {
      manageProcessing(false);
    }
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [carDropDownValue, setCarDropDownValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [serviceDropDown, setServiceDropDown] = useState(null);
  const [dateText, setDateText] = useState('Select Appointment Date');
  const [timeText, setTimeText] = useState('Select Time');

  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const onChange = (event, selectedDate) => {
    const currentDate = new Date(selectedDate);
    setShow(false);
    setDate(currentDate);
    setDateText(() => {
      let text =
        weekday[currentDate.getDay()] +
        ' ' +
        currentDate.getDate().toString() +
        ' ' +
        monthNames[currentDate.getMonth()] +
        ' ' +
        currentDate.getFullYear().toString();

      console.log(text);
      return text;
    });
    setTimeText(() => {
      let text =
        currentDate.getHours() +
        ' Hrs ' +
        (currentDate.getMinutes() / 30) * 30 +
        ' Minutes';
      return text;
    });
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <Layout
      scrollable={true}
      padding={0}
      title={'Book an Appointment'}
      showBack={true}>
      <View style={flexContainer}>
        <View style={outer}>
          <View>
            <Pressable onPress={showDatepicker} style={styles.container}>
              <Text style={styles.textContainer}>{dateText}</Text>
            </Pressable>
            <Pressable
              onPress={showTimepicker}
              style={[styles.container, styles.containerBottom]}>
              <Text style={styles.textContainer}>{timeText}</Text>
            </Pressable>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={
                  new Date(
                    86400000 * Math.floor(new Date().getTime() / 86400000) +
                      12600000,
                  )
                }
                mode={mode}
                is24Hour={true}
                minuteInterval={30}
                onChange={onChange}
                minimumDate={new Date()}
              />
            )}
          </View>
          <CustomTextInput
            onTextChange={(text: string) => onChangeText(text, 'cityName')}
            value={cityName}
            label={'City Name'}
            placeholder={''}
            maxLength={40}
            isTick={/(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i.test(
              String(cityName).toLowerCase(),
            )}
            keyboardType={'email-address'}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Dropdown
            style={[
              styles.dropdown,
              {
                borderColor: appTheme.textContainer,
                backgroundColor: appTheme.background,
              },
            ]}
            placeholderStyle={[
              styles.placeholderStyle,
              ,
              {color: appTheme.textContainer},
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {color: appTheme.textContainer},
            ]}
            inputSearchStyle={[
              styles.inputSearchStyle,
              {
                color: appTheme.textContainer,
                backgroundColor: appTheme.background,
              },
            ]}
            containerStyle={{backgroundColor: appTheme.background}}
            activeColor={appTheme.background}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Car type' : '...'}
            searchPlaceholder="Search..."
            value={carDropDownValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setCarDropDownValue(item.value);
              setIsFocus(false);
            }}
          />

          <Dropdown
            style={[
              styles.dropdown,
              {
                borderColor: appTheme.textContainer,
                backgroundColor: appTheme.background,
              },
            ]}
            placeholderStyle={[
              styles.placeholderStyle,
              ,
              {color: appTheme.textContainer},
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {color: appTheme.textContainer},
            ]}
            inputSearchStyle={[
              styles.inputSearchStyle,
              {
                color: appTheme.textContainer,
                backgroundColor: appTheme.background,
              },
            ]}
            containerStyle={{backgroundColor: appTheme.background}}
            activeColor={appTheme.background}
            iconStyle={styles.iconStyle}
            data={serviceData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Service type' : '...'}
            searchPlaceholder="Search..."
            value={serviceDropDown}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setServiceDropDown(item.value);
              setIsFocus(false);
            }}
          />
          <GradientButton
            title={'See Available Centers'}
            isProcessing={isProcessing}
            onPress={onSeeCenters}
            exStyle={marginTop}
          />
        </View>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  outer: {
    width: '85%',
    alignSelf: 'center',
    flex: 1,
    marginTop: 130,
  },
  title: {
    marginVertical: 20,
    textAlign: 'center',
  },
  btnText: {
    textAlign: 'right',
    paddingVertical: 5,
  },
  marginTop: {
    marginTop: 10,
    width: '100%',
  },
  flexDirection: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
  },
  headerContiner: {
    top: 20,
    marginHorizontal: 30,
  },
  imageContainerStyle: {
    height: 17,
    width: 24,
  },
  textContainer: {
    fontSize: fontSizes.medium,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  container: {
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 25,
  },
  containerBottom: {
    marginBottom: 0,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
  },
  placeholderStyle: {
    fontSize: 14,
    marginLeft: 10,
    opacity: 0.2,
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default BookAppointment;

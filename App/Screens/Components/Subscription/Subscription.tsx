import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  Pressable,
  Image,
} from 'react-native';
import { AppContext } from '@AppContext/index';
import CommonStyle from '@Theme/CommonStyle';
import Toast from 'react-native-simple-toast';
import { CustomTextInput, Layout ,CustomText,CustomDropDown} from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';
import { GradientButton } from '@SubComponents/index';
import { useNavigation } from '@react-navigation/native';
import { isIOS } from '@Utils/Constant';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fontSizes } from '@Utils/Constant';
import RazorpayCheckout from 'react-native-razorpay';
import {payment} from "@Components/Subscription/Payment";

const data = [
    { label: 'Hatchback', value: '1' },
    { label: 'Sedan', value: '2' },
    { label: 'SUV', value: '3' },
    { label: 'Crossover', value: '4' },
    { label: 'Convertible', value: '5' },
];

const serviceData = [
    { label: 'Exterior Cleaning', value: '1' },
    { label: 'Full Cleaning', value: '2' },
];


const styles = StyleSheet.create({
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
  datePickerOuter: {
    borderWidth: 1,
    borderRadius:5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    fontSize: fontSizes.medium,
    flex: 1,
    justifyContent: 'center',
    marginLeft:10,
    height:50
  },
  toText:{
      marginVertical:20,
      ...CommonStyle.center
  },
  forCheckButton:{
    height:25,
    width:25,
    borderRadius:90,
    borderWidth:1,
    ...CommonStyle.center
  },
  checkImage:{
    height:20,
    width:20
  },
  addressText:{
    marginLeft:10
  },
  icon: {
    marginRight: 5,
  },
});

const Subscription = (props: any) => {
  const { appTheme } = useContext(AppContext);
  const navigation = useNavigation();
  const [startDatePicker, setStartDatePicker] = useState(false);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [endDatePicker, setEndDatePicker] = useState(false);
 
  const [startDate, setStartDate] = useState(new Date());

  const [realShowDate, setRealShowDate] = useState(false);

  const [endDate, setEndDate] = useState(new Date());

  const [realEndShowDate, setRealEndShowDate] = useState(false);

  const [showDate, setShowDate] = useState('');

  const [showEndDate, setShowEndDate] = useState('');

  const [carDropDownValue, setCarDropDownValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [serviceDropDown, setServiceDropDown] = useState(null);

  const [seeStartDate, setSeeStartDate] = useState(false);
  const [seeEndDate, setSeeEndDate] = useState(false);
  const [seeAddress, setSeeAddress] = useState(false);
  const [seeCity, setSeeCity] = useState(false);
  const [seeCarType, setSeeCarType] = useState(false);
  const [seeServicesType, setServicesType] = useState(false);
  const [errorStartDate, setErrorStartDate] = useState('');
  const [errorEndDate, setErrorEndDate] = useState('');
  const [errorAddress, setErrorAddress] = useState('');
  const [errorCity, setErrorCity] = useState('');
  const [errorCarType, setErrorCarType] = useState('');
  const [errorServicesType, setErrorServicesType] = useState('');

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    city:'',
    address:'',
    mobileNumber:'',
    pinCode:'',
    confirmPassword: '',
    password: '',
    isSecureTextEntry: true,
    isProcessing: false,
  });
  
  const onSubscribe=async (description:string,amount:string,color:string)=>{

        if(!showDate.length && !showEndDate.length && !address.length && !city.length && !carDropDownValue && !serviceDropDown){
          return Toast.show('Please Fill all field', Toast.SHORT);
        }

        if(!showDate.length){
          setErrorStartDate("Start Date field is Empty");
          setSeeStartDate(true);
        }else{
          setSeeStartDate(false);
        }

        if(!showEndDate.length){
          setErrorEndDate("End Date field is Empty");
          setSeeEndDate(true);
        }else{
          setSeeEndDate(false);
        }
        
        if(!address.length){
          setErrorAddress("Address field is Empty");
          setSeeAddress(true);
        }else{
          setSeeAddress(false);
        }

        if(!city.length){
          setErrorCity("City field is Empty");
          setSeeCity(true);
        }else{
          setSeeCity(false);
        }

        if(!carDropDownValue){
          setErrorCarType("Car Type field is Empty");
          setSeeCarType(true);
        }else{
          setSeeCarType(false);
        }

        if(!serviceDropDown){
          setErrorServicesType("Car Type field is Empty");
          setServicesType(true);
        }else{
          setServicesType(false);
        }
        if(!showDate.length || !showEndDate.length || !address.length || !city.length || !carDropDownValue || !serviceDropDown){
          return 0;
        }
    
        RazorpayCheckout.open(payment(description,amount,appTheme.themePurple))
          .then((data) => {
            console.log({status : true,Success: data.razorpay_payment_id});       
            return {status : true,Success: data.razorpay_payment_id}
          })
          .catch((error) => {
            console.log({status : false,Failure: error.description});
            return {status : false,Failure: error.description}
         });
     
    }

  const { city ,address, isProcessing } = state;

  const {datePickerOuter,datePicker,textInputContainer,toText,forCheckButton,checkImage,addressText,icon} =styles;
  
  const { flexContainer, marginTop, outer, rowDirection } = CommonStyle;

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

  const showDatePicker=()=> {
    setStartDatePicker(true);
  };

  const showEndDatePicker=()=> {
    setEndDatePicker(true);
  };
 
  const onDateSelected=(event:any, value:any)=> {
    if(!(new Date().getDate()===startDate.getDate())){
      console.log("vivekkkkkkk");
      setRealShowDate(true);
      console.log("boolean",showDate==startDate.toDateString());
      
      if(!(showDate==startDate.toDateString())){
        console.log(showDate,startDate.toDateString());
        
        setStartDate(value);
        setRealEndShowDate(false)
      }
      setStartDate(value);
      setShowDate(startDate.toDateString())
      setStartDatePicker(false);
    }else{
      console.log("mandaniiiii");
      if((showDate==startDate.toDateString())){
        setStartDate(value);
        setRealEndShowDate(false)
      }
      setStartDate(value);
      //setShowDate('')
      setShowDate(startDate.toDateString())
      setStartDatePicker(false);
    }
  };

 const onEndDateSelected=(event:any, value:any)=> {
    if(!(new Date().getDate()===endDate.getDate())){
      setEndDate(value);
      setShowEndDate(endDate.toDateString())
      setRealEndShowDate(true)
      setEndDatePicker(false);
    }else{
      setEndDate(value);
      //setRealEndShowDate(true)
      setShowEndDate(endDate.toDateString())
      setEndDatePicker(false);
    }
    console.log(showEndDate);
    
  };

  const check=()=>{
      setIsChecked(!isChecked)
  };

  const emptyStartDate = () => {
    Toast.show('Please first field Start Date', Toast.SHORT);
  }

  return (

    <Layout scrollable={true} padding={0} title={'Subscribe'} showBack={true}>
        <View style={flexContainer}>
            <View style={outer}>
                <View style={[datePickerOuter,{borderColor:appTheme.textContainer}]}>
                    <Pressable style={textInputContainer}  onPress={showDatePicker}>
                        {startDatePicker && (
                            <DateTimePicker
                                value={startDate}
                                mode={'date'}
                                display={isIOS ? 'spinner' : 'default'}
                                is24Hour={true}
                                minimumDate={new Date(Date.now() + 86400000)}
                                maximumDate={new Date(Date.now() + 62208000000)}
                                onChange={onDateSelected}
                                style={datePicker}
                            />
                        )}
                        {!startDatePicker && (
                            <CustomText large style={[{ color: showDate.length ? appTheme.text : appTheme.text}]}>
                                {showDate.length ? showDate : 'Choose Start Date'}
                            </CustomText>
                        ) }
                    </Pressable>
                </View>
                {
                  seeStartDate?(
                    <CustomText
                      medium
                      style={{ color: 'red', margin: 5 }}>{errorStartDate}
                    </CustomText>
                  ):(
                    <></>
                  )
                }

                <View style={toText}>
                    <CustomText xxlarge style={[{ color: appTheme.text }]}>
                        To
                    </CustomText>
                </View>

                {realShowDate?(
                  <>
                    <View style={[datePickerOuter,{borderColor:appTheme.textContainer}]}>
                        <Pressable style={textInputContainer} onPress={showEndDatePicker}>
                            {endDatePicker && (
                                <DateTimePicker
                                    value={endDate}
                                    mode={'date'}
                                    display={isIOS ? 'spinner' : 'default'}
                                    is24Hour={true}
                                    minimumDate={new Date(startDate.getTime() + 172800000)}
                                    onChange={onEndDateSelected}
                                    style={datePicker}
                                />
                            )}
                            {!endDatePicker && (
                                
                                <CustomText large style={[{ color: appTheme.text }]}>
                                    {realEndShowDate? showEndDate : 'Choose End Date'}
                                </CustomText>
                            ) }
                        </Pressable>
                    </View> 

                    {
                      seeEndDate?(
                        <CustomText
                          medium
                          style={{ color: 'red', margin: 5 }}>{errorEndDate}
                        </CustomText>
                      ):(
                        <></>
                      )
                    }                 
                  </>
                ):(<>
                  <View style={[datePickerOuter,{borderColor:appTheme.textContainer,opacity:0.5}]}>
                        <Pressable style={textInputContainer} onPress={emptyStartDate}>
                          <CustomText large style={[{ color: appTheme.text }]}>
                            Choose End Date
                          </CustomText>
                        </Pressable>
                    </View>                 
                </>)}

                <CustomTextInput
                    onTextChange={(text: string) => (onChangeText(text, 'address'))}
                    value={address}
                    label={"Address"}
                    placeholder={''}
                    multiline={true}
                    errorMassage={errorAddress}
                    hideLabel={seeAddress}
                    onSubmitEditing={Keyboard.dismiss}
                />

                <View style={rowDirection}>
                    <Pressable style={[forCheckButton,{borderColor:appTheme.themePurple}]} onPress={check}>
                        {
                            !isChecked?(<></>):(
                                <Image source={{uri:AppImages.tickInput}} resizeMode={'contain'} style={styles.checkImage}/>
                            )
                        }
                    </Pressable>
                    <View style={addressText}>
                        <CustomText large>Same as saved before</CustomText>
                    </View>
                </View>

                <CustomTextInput
                        onTextChange={(text: string) => (onChangeText(text, 'city'))}
                        value={city}
                        label={"City Name"}
                        placeholder={''}
                        errorMassage={errorCity}
                        hideLabel={seeCity}
                        maxLength={40}
                        onSubmitEditing={Keyboard.dismiss}
                />

                <CustomDropDown
                    data={data}
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
                {
                  seeCarType?(
                    <CustomText
                      medium
                      style={{ color: 'red', margin: 5 }}>{errorCarType}
                    </CustomText>
                  ):(
                    <></>
                  )
                }

                <CustomDropDown
                    data={serviceData}
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

                {
                  seeServicesType?(
                    <CustomText
                      medium
                      style={{ color: 'red', margin: 5 }}>{errorServicesType}
                    </CustomText>
                  ):(
                    <></>
                  )
                }
                    <GradientButton
                        title={'Make Payment'}
                        isProcessing={isProcessing}
                        onPress={()=>(onSubscribe('Pay Subscription Fee','25000',appTheme.themePurple))}
                        exStyle={marginTop}
                    />
            </View>
        </View>
    </Layout>
  );
};

export default Subscription;
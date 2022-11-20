import React, { forwardRef, useContext, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Keyboard,
  Text,
} from "react-native";
import Toast from "react-native-simple-toast";
import { AppContext } from "@AppContext/index";
import CommonStyle from "@Theme/CommonStyle";
import {
  AssetImage,
  CustomText,
  CustomTextInput,
  Layout,
} from "@CommonComponent/index";
import AppImages from "@Theme/AppImages";
import { BottomView, GradientButton } from "@SubComponents/index";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { setItemInStorage } from "@Utils/Storage";
import { isValidEmail, isStrongPassword } from "@Utils/Helper";
import { Route } from "@Routes/AppRoutes";
import { ScrollView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import { height, width } from "@Utils/Constant";

const styles = StyleSheet.create({
  btnText: {
    textAlign: "right",
    paddingVertical: 5,
  },
  marginTop: {
    marginTop: 10,
    width: "100%",
  },
  outer: {
    width: "100%",
    alignSelf: "center",
  },
  wrapper: {
    height: height * 0.4,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
);

const Home = (props: any) => {
  const { appTheme, translations } = useContext(AppContext);

  const navigation = useNavigation();
  const [state, setState] = useState({
    isProcessing: false,
  });
  const { isProcessing } = state;

  const { btnText, marginTop, outer } = styles;
  const { carouselImage, flexContainer, carousel } = CommonStyle;

  const goToNextScreen = (page: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: page }],
      })
    );
  };

  const goToSubscribe = () => {
    try {
      props.navigation.navigate(Route.SubscriptionScreen);
    } catch (error) {
      //manageProcessing(false);
    }
  };
  const goToBookAppointment = () => {
    try {
      props.navigation.navigate(Route.BookAppointmentScreen);
    } catch (error) {
      //manageProcessing(false);
    }
  };
  return (
    <Layout scrollable={true} padding={20} title={"Home"}>
      <View style={flexContainer}>
        <View style={outer}>
          <Swiper style={styles.wrapper} autoplay index={2}>
            <View style={carousel}>
              <AssetImage
                source={AppImages.slider1}
                imageStyle={carouselImage}
              />
            </View>
            <View style={carousel}>
              <AssetImage
                source={AppImages.slider2}
                imageStyle={carouselImage}
              />
            </View>
            <View style={carousel}>
              <AssetImage
                source={AppImages.slider3}
                imageStyle={carouselImage}
              />
            </View>
            <View style={carousel}>
              <AssetImage
                source={AppImages.slider4}
                imageStyle={carouselImage}
              />
            </View>
          </Swiper>

          <GradientButton
            title={"Subscribe"}
            isProcessing={isProcessing}
            onPress={() => goToSubscribe()}
            exStyle={marginTop}
          />
          <GradientButton
            title={"Book Appointment"}
            isProcessing={isProcessing}
            onPress={() => goToBookAppointment()}
            exStyle={marginTop}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Home;

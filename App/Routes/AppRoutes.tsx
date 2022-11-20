import InitialScreen from '@Components/Initial';
import Login from '@Components/Login/Login';
import EmailRegistration from '@Components/Registration/EmailRegistration';
import Otp from '@Components/Registration/Otp';
import SetPassword from '@Components/Registration/SetPassword';
import SetProfileDetails from '@Components/Registration/SetProfileDetails';
import Subscription from '@Components/Subscription/Subscription';
import Worker from '@Components/Worker/Worker';
import WorkDetails from '@Components/WorkDetails/WorkDetails';
import Home from '@Components/Home/Home';
import ActiveServices from '@Components/ActiveServices/ActiveServices';
import CenterDisplay from '@Components/CenterDisplay/CenterDisplay';
import BookAppointMent from '@Components/BookAppointment/BookAppointment';
import {AppTab} from '@Routes/AppTab';
import Completed from '@Components/Completed/Completed';
import EditProfile from '@Components/UserProfile/EditProfile';

enum Route {
  Initial = 'InitialScreen',
  LoginScreen = 'Login',
  HomeScreen = 'Home',
  EmailRegistrationScreen = 'EmailRegistration',
  OtpScreen = 'Otp',
  SetPasswordScreen = 'PasswordScreen',
  SetProfileDetailsScreen = 'SetProfileDetails',
  SubscriptionScreen = 'Subscription',
  ActiveServicesScreen = 'ActiveServices',
  CenterDisplayScreen = 'CenterDisplay',
  BookAppointmentScreen = 'BookAppointment',
  WorkerScreen = 'Worker',
  WorkDetailsScreen = 'WorkDetails',
  CompletedScreen = 'Completed',
  EditProfileScreen = 'EditProfile',
}

const Routes = [
  {
    name: Route.Initial,
    screen: InitialScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.LoginScreen,
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.HomeScreen,
    screen: AppTab,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.EmailRegistrationScreen,
    screen: EmailRegistration,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.OtpScreen,
    screen: Otp,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.SetPasswordScreen,
    screen: SetPassword,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.SetProfileDetailsScreen,
    screen: SetProfileDetails,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.SubscriptionScreen,
    screen: Subscription,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.WorkerScreen,
    screen: Worker,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.WorkDetailsScreen,
    screen: WorkDetails,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.CompletedScreen,
    screen: Completed,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.ActiveServicesScreen,
    screen: ActiveServices,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.CenterDisplayScreen,
    screen: CenterDisplay,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.BookAppointmentScreen,
    screen: BookAppointMent,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.EditProfileScreen,
    screen: EditProfile,
    navigationOptions: {
      headerShown: false,
    },
  },
];

export {Routes, Route};

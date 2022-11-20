import Config from 'react-native-config';

const productionUrl = Config.API_URL;

const developmentUrl = Config.API_TEST_URL;

const ENVIRONMENT = {
  PROD: 'PROD',
  DEV: 'DEV',
};

const currentEnv = ENVIRONMENT.DEV;

const baseUrl =
  (currentEnv === ENVIRONMENT.PROD && productionUrl) || developmentUrl;

const baseUrlApi = 'https://7ffa-115-246-17-93.in.ngrok.io/api/';

let ApiConfig: {
  baseUrl: string;
  baseUrlApi: string;
  token: null | string;
  login: string;
  user: string;
  signUp: string;
  emailVerification: string;
  forgotPassword: string;
  updateProfile: string;
} = {
  baseUrl,
  baseUrlApi,
  token: null,
  login: `${baseUrlApi}user/login`,
  user: `${baseUrlApi}users`,
  signUp: `${baseUrlApi}user/signup`,
  emailVerification: `${baseUrlApi}user/EmailVerification`,
  forgotPassword: `${baseUrlApi}user/forgetPassword`,
  updateProfile: `${baseUrlApi}user/updateprofile`,
};

export {ApiConfig};

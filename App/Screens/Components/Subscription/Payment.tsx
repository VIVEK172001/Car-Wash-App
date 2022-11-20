import { AppContext } from '@AppContext/index';

export const payment=(description:string,amount:string,color:string)=>{

    let options : object = {
        description: description,
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        amount: amount,
        key: 'rzp_test_GHw1rT7R9HPOWU',
        name: 'Carosh',
        prefill: {
          email: 'carosh.atliq@email.com',
          contact: '9191919191',
          name: 'ReactNativeForYou',
        },
        theme: {color: color},
      };

    return options;
}
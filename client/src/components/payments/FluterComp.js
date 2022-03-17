import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

export default function App() {
    const config = {
        public_key: 'FLWPUBK-73d4ee4813ff30b6ba16fef3349f90e1-X',
        tx_ref: Date.now(),
        amount: 50,
        currency: 'NGN',
       // payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: 'akanbijosephtobi@gmail.com',
          phonenumber: '09075356579',
          name: 'Akanbi joseph',
        },
        customizations: {
          title: 'Flip Trade',
          description: 'Payment for fliptrade',
         // logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };;

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
       console.log(response);
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div className="enter-deposit-amount">
     <h1>Hello Test user</h1>
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './components/shared/landing';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import NotFound from './components/NotFound/NotFound';
import './index.css';
import './App.css';
import Details from './components/details/details';
import Trade from './components/trade/trade';

//import UserDashboard from './components/shared/dashbord/userDashbord';
import Sell from './components/trade/sell/Sell';
//import Vcards from './components/trade/vCards/vcards';
import Crypto from './components/trade/vCards/Crypto';
import BuyCards from './components/trade/buy/BuyCards';
//import PreOrderForm from './components/trade/buy/PreOrderForm';
import Profile from './components/shared/dashbord/profile/Profile';
import Assets from './components/shared/dashbord/profile/Assets';
import DepositMenu from './components/shared/dashbord/deposit/Deposit';
import Withdraw from './components/shared/dashbord/deposit/Withdraw';
import TypesOfCards from './components/trade/sell/TypesOfCards';
//import PreSold from './components/trade/sell/PreSold';
import TypesOfCrypto from './components/trade/sell/TypesOfCrypto';
import PreSoldCrypto from './components/trade/sell/PreSoldCrypto';
//import PreSellGiftCard from './components/trade/sell/PreSellGiftCard';
import PrivateRoute from './components/shared/auth/PrivateRoute';
import EnterMail from './components/transfers/EnterMail';
import MakeTransfer from './components/transfers/MakeTransfer';
//import Pricing from './components/shared/priceing';
//import InvieAndEarn from './components/shared/Invite';
//import AssetDetails from './components/shared/dashbord/profile/AssetDetails';
import Invest from './components/trade/invest';
import Transaction from './components/transfers/Transactions';
import Homedoc from './components/shared/Homedoc';


//Check for token
if( localStorage.flipJwtToken ){
  //Set auth token header auth
  setAuthToken( localStorage.flipJwtToken );
  //Decode token and get user info and export
  const decoded = jwt_decode( localStorage.flipJwtToken );
  //Set user and isAuthenticated
  store.dispatch( setCurrentUser( decoded ) );
  //console.log('not time out')
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if( decoded.exp < currentTime ){
    // Logout user
    console.log('time out')
    store.dispatch( logoutUser() );

    // Clear current profile
    store.dispatch( clearCurrentProfile() );

    // Redirect to login page
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Header/>
            <div className="sit-main-css">
              <Switch>
                <Route exact path="/" component={ Homedoc } />
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/home" component={ Landing } />
                <PrivateRoute exact path="/detail/:coin" component={Details} />
                <PrivateRoute exact path="/trade" component={Trade} />
                <PrivateRoute exact path="/invest" component={Invest} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/sell" component={Sell} />
                <PrivateRoute exact path="/assets" component={Assets} />
                <PrivateRoute exact path="/sell/cards" component={TypesOfCards} />
                <PrivateRoute exact path="/sell/crypto" component={TypesOfCrypto} />
                <PrivateRoute exact path="/sell/crypto/:type" component={PreSoldCrypto} />
                <PrivateRoute exact path="/buy/:amount" component={BuyCards} />
                <PrivateRoute exact path="/crypto/:amount" component={Crypto} />
                <PrivateRoute exact path="/transactions" component={Transaction} />
                <PrivateRoute exact path="/deposit" component={DepositMenu} />
                <PrivateRoute exact path="/withdraw" component={Withdraw} />
                <PrivateRoute exact path="/transfer" component={EnterMail} />
                <PrivateRoute exact path="/swap/:type" component={MakeTransfer} />
                <Route  path="" component={ NotFound }/>
              </Switch>
            </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
    );
  }
}

export default App;

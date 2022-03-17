import React, { Component } from 'react'
//import Box from './dashbord/boxes/box';
//import Box3 from './dashbord/boxes/box3';
import TopSection from './TopSection';
import {getTransactions} from '../../actions/authActions';
//import {getProfile, logoutUser, getTransactions, clearStatus} from '../../../../actions/authActions'
import { connect } from 'react-redux'
import axios from 'axios'
class Landing extends Component {

       state = { 
            coins: [],
           eCards: [{ name: 'g', price: '$45', type: 'Google' },
           { name: 'i', price: '$10', type: 'iTunes' },
               { name: 'a', price: '$100', type: 'Amazon' },
               { name: 'x', price: '$50', type: 'Xbox' },
           ],
           vCards: [{ name: 'm', price: '$50', type: 'Master' },
               { name: 'v', price: '$200', type: 'Visa' },
               { name: 'va', price: '$400', type: 'Valve' },
            ],

           online:false
         };
   
    componentDidMount() {
        this.props.getTransactions()
        
        this.makeCalls()
      // action.test()
       console.log(navigator.onLine);
       this.setState({
           online:navigator.onLine
       })

       if (navigator.onLine) {

           setInterval(this.makeCalls,10000)
       }
   }
   
    makeCalls = () => {
        axios({
            method: 'get',
            url: 'https://data.messari.io/api/v2/assets',
        // responseType: 'stream'
        })
            .then((response) => {
                //console.log(response.data.data)
               // let crypto = this.getWantedCryptos(response.data.data);
                this.setState({coins:response.data.data})
               // console.log(response.data)
            }).catch(err => {
            // console.log(err)
         })
   }
    getWantedCryptos = (data) => {
        let crypto = [];
        data.map((e) => {
             if (e.name === 'Bitcoin' || e.name === 'Ethereum' || e.name === 'XRP' || e.name === 'Litecoin')
             {
                return crypto.push(e)
            }
            return crypto
        })
        /**
         * percent_change_btc_last_24_hours: 0
            percent_change_eth_last_24_hours: 3.4502336951174697
            percent_change_usd_last_1_hour: 1.2972074495432924
            percent_change_usd_last_24_hours: -6.847895354360581
            price_btc: 1
            price_eth: 30.494681459342424
            price_usd: 53588.00755475307
         */
       // console.log(crypto[0].metrics.market_data.price_usd
       // )
        return crypto
    }

    render() {
        //console.log(this.props)
      //  const isAuth=this.props.auth.isAuthenticated
       // const auth =  this.props.auth.user.id
       // const trns = this.props.profile.transaction? this.props.profile.transaction:[]
        const {coins}=this.state
        return (
            <div className='landing-page'>
                
                <TopSection />
                {
                      coins.length > 0 ? (
                        coins.map((t, i) => {
                            //console.log(t)
                            return (<div key={i} className={`crypto-tabs ${t.metrics.market_data.percent_change_usd_last_1_hour.toFixed(2)<0?'red-bg':'green-border'}`}>
                                <div>{t.symbol}</div>
                                <div>USD{t.metrics.market_data.price_usd.toFixed(2)}</div>
                                <div>{t.metrics.market_data.percent_change_usd_last_1_hour.toFixed(2)}%</div>
                            </div>)
                           
                               /* (  <div key={i} className={"trans-list red-border"}>
                                <div className={`trans-icon red-bg` }>

                                </div>
                                    <div className="trans-cont">
                                        <div>
                                            <div className={`trans-to red`}>{t.to.fullName}</div>
                                            <div className={`trans-from`}>{t.user.fullName}</div>
                                        </div>
                                        <div>
                                            <div className={`trans-amount red`}>{t.amount}NGN</div>
                                            <div className="trans-date">{new Date(t.date).toISOString().replace('-', '/').split('T')[0]}</div>
                                        </div>
                                    </div>
                                 </div>)*/
                          
                        })
                    ) :
                        (
                            <div className="Notrans">No transactions</div>
                        )
                }

                <section className="section-body">
                </section>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    profile:state.profile
  });

export default connect( mapStateToProps, {  getTransactions} )( Landing );
//export default Landing;
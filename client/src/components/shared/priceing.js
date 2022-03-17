import React, { Component } from 'react'
import Box from './dashbord/boxes/box';
import Box3 from './dashbord/boxes/box3';
//import TopSection from './TopSection';
//import {getTransactions} from '../../actions/authActions';
//import {getProfile, logoutUser, getTransactions, clearStatus} from '../../../../actions/authActions'
//import { connect } from 'react-redux'
import axios from 'axios'
class Pricing extends Component {

       state = { 
            coins: [{ offline:true, name: 'Bitcoin', price: '...', percentage: '...' },
                        {offline:true, name: 'Ethereum', price: '...', percentage: '...' },
                        {offline:true, name: 'XRP', price: '...', percentage: '...' },
                        {offline:true, name: 'Litecoin', price: '...', percentage: '...' }
                ],
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
               // console.log(response.data.data)
                let crypto = this.getWantedCryptos(response.data.data);
                this.setState({coins:crypto})
               // console.log(crypto)
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

      //  const trns =this.props.profile.transaction? this.props.profile.transaction:[]
        return (
            <div className='landing-page'>
              
                <section className="section-body">
                        { this.state.coins.map((c, i) => {
                            return <Box key={i} coin={ c }/>
                    })}
                </section>
                <div className="section-seperator">
                    Gift cards
                </div>
                <section className="testiomonys">
                    <Box3 data={this.state.eCards}/>
                </section>
                <div className="section-seperator">
                     vCards
                </div>
                <section className="testiomonys">
                    <Box3 data={this.state.vCards}/>
                </section> 
            </div>
        );
    }
}

/*const mapStateToProps = ( state ) => ({
    auth: state.auth,
    profile:state.profile
  });
*/
//export default connect( mapStateToProps, {  getTransactions} )( Landing );
export default Pricing;
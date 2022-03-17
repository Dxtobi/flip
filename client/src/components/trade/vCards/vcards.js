import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
//import Box3 from '../../shared/dashbord/boxes/box3';
import { getAllCards } from "../../../actions/Trade";
import { connect } from 'react-redux'

class Vcards extends Component {
    
    state = { 
        vCards: [{ seller: 'dude rokey', price: 100, payment_methods: 'Btc, Litecoin, Bank transfer' },
                { seller: 'michel deem', price: 200, payment_methods: 'Btc' },
                { seller: 'Jeneth hustern', price: 300, payment_methods: 'Bank transfer, Paypal', pre_sale:true },
           ],
    };

    componentDidMount() {
        this.props.getAllCards()
    }
    componentWillReceiveProps(nextProps) {
        //console.log('.....')
        console.log(nextProps.trade.trades)
    }

    
    render() {
        const type = this.props.match.params.type
        const {trades} = this.props.trade
        return (
            <div className='vcards-component'>
                 
                <h3 style={{textAlign:'center', color:'gray', textTransform:'capitalize'}}>{type}</h3>
                {
                     trades.map((d, i) => {
                         if (d.pre_sale) {
                            return (
                                <Link to={`/buy/${d.price}`} key={i} className={`card-listing`}>
                                    <div className='pre-sold' style={{marginBottom:10}}>Pre sold for BTC </div>
                                    <div className={`card-listing-header`}>
                                        <div className='seller-name'> {d.seller}</div> <div className='seller-name' style={{ color: 'green' }}>trusted user</div> </div>
                                        <div className='card-pricing'>
                                            for ${d.price} worth of payment method
                                        </div>
                                        <div className='pre-sold'>
                                            pre-sold:Bitcoin
                                        </div>
                                </Link>
                                    )
                         } else {
                            return (
                                <Link to={`/buy/${d.valueOfCurrency}`}  key={i} className={`card-listing`}>
                                    <div className={`card-listing-header`}>
                                        <div className='seller-name'> {d.user.fullName}</div> <div style={{ color: 'green' }} className='seller-name'>{ d.valid?'valid':'not checked.'}</div> </div>
                                        <div className='card-pricing'>
                                            Being sold for {d.valueOfCurrency}FLC
                                        </div>
                                        
                                     <div className='card-payment'>
                                         {d.cardType}
                                     </div>
                                </Link>
                            )
                        }
                 })
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trade: state.trade
    }
}

export default connect(mapStateToProps, {getAllCards})(Vcards)

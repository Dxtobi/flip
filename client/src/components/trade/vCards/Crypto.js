import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
//import Box3 from '../../shared/dashbord/boxes/box3';

class Vcards extends Component {
    
    state = { 
        vCards: [{ seller: 'dude rokey', price: 1.0, par: "USD", payment_methods: 'Bank Transfer', tradeTimes:332, ratings:'86%' },
                 { seller: 'michel deem', price: 1.2, par: "USD", payment_methods: 'Bank Transfer', tradeTimes:32, ratings:'99%'},
                 { seller: 'Jeneth hustern', price: 1.6, par: "USD", payment_methods: 'Bank Transfer', pre_sale:true, tradeTimes:892, ratings:'77%' },
           ],
         };
    render() {
        const amount = this.props.match.params.amount
        
        return (
            <div className='vcards-component'>
                <h3 style={{ textAlign: 'center', color: 'gray', textTransform: 'capitalize', marginTop: 20 }}>Buying {amount} USD</h3>
                {
                     this.state.vCards.map((d, i) => {
                            return (
                                <Link to={{
                                    pathname: `/buy/${amount}`,
                                    query:{ price: d.price }
                                }}  key={i} className={`card-listing`}>
                                    <div className={`card-listing-header`}>
                                        <div className='seller-name'> {d.seller}</div> <div style={{ color: 'green' }} className='seller-name'>{`Trades: ${d.tradeTimes} / ${d.ratings}`}</div> </div>
                                        <div className='card-pricing'>
                                        Rate {`USD${d.price}`} par {d.par}
                                        </div>
                                        <div className='card-payment'>
                                            {d.payment_methods} / Pay Link
                                        </div>
                                </Link>
                            )
                 })
                }
            </div>
        );
    }
}

export default Vcards;
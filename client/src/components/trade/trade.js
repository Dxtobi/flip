import React from 'react';
import Link from 'react-router-dom/Link';
class Trade extends React.Component {

    state = { 
        stocks: [
            { p:false, name: 'MNC', price: '$220', percentage: '-11.76%', total:'425,766million'},
            { p:true, name: 'STL', price: '$1.5', percentage: '+6.27%', total:'1324,5832million' },
            { p:false, name: 'ZUC', price: '$1.7', percentage: '-11.36%', total:'47,500/597million' },
            { p:true, name: 'ETH', price: '$2000', percentage: '+1.87%', total:'893/2445billion' },
            { p:true, name: 'XRP', price: '$0.9', percentage: '+23.40%', total:'482/996million'},
            { p: true, name: 'LTC', price: '$30', percentage: '+2.04%', total: '234/456million' },
            { p: false, name: 'BTC', price: '$18000', percentage: '-2.99%', total: '235/654million' },
       ]
    };
    
    render() {
        return (
            <div className='stock-list'>
                
                {
                    this.state.stocks.map((s, i) => {
                        return (
                            <div key={i} className='list-item'>
                                <div className='list-item-data'>
                                   {`${s.name} ${s.price}`}
                                </div>
                                <div className={`list-item-data ${s.p ? 'green':'red' }`}>
                                    {`${s.percentage}`}
                                    <Link to='/buy' className='trade-btn buy'>
                                        Buy
                                   </Link>
                                   <Link to='/sell' className='trade-btn sell'>
                                        Sell
                                   </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Trade;
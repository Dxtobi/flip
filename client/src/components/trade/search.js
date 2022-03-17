import React from 'react';
import Link from 'react-router-dom/Link';
class Trade extends React.Component {

    state = { 
       
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
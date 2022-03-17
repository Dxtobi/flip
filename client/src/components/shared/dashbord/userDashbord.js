import React, { Component } from 'react'
import Link from 'react-router-dom/Link';

class UserDashboard extends Component {
   
    state = { 
        userAssets: [
            { asset: 'BTC', amount: 0.934, amountInCash: '25000' },
            { asset: 'ETH', amount: 1.234, amountInCash: '1000' },
            {asset:'LTC', amount:1.234, amountInCash:'170'},
        ]
    };

    render() {
        return (
            <div className='dashboard'>
                <div className='dashboard-header'>
                    <div>200CV</div>
                    <div className='dashboard-header-foot'>
                         
                    </div>
                </div>
                {this.state.userAssets.map((d, i) => {
                    return (
                        <div key={i} className='asset-list-item'>
                            <h2>{d.asset}</h2>
                            <Link to={`/sell/crypto/${d.amount}/${d.asset}`}className='asset-list-item-data'>
                                <div>{d.amount}</div>
                                <div>${d.amountInCash}</div>
                            </Link>
                        </div>
                   )
                })}
            </div>
        );
    }
}

export default UserDashboard;
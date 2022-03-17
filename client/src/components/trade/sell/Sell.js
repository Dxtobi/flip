import React from 'react';
import { Link } from 'react-router-dom';
import { SiBitcoin,} from 'react-icons/si'
class Sell extends React.Component {

    state = { 
        accountDetails: {
            balance: 30000,
        },
        remainingAmount:30000
    };
    
   
    
    render() {
        return (
            <div>
                <Link to='/sell/crypto' className={`list-item `}>
                                <div className='list-item-data'>
                                   Crypto
                                </div>
                                <div className={`list-item-data`}>
                                    <SiBitcoin size={20}/>
                                </div>
                </Link>
                {/*<Link to='/sell/cards' className={`list-item `}>
                                <div className='list-item-data'>
                                  Gift Cards
                                </div>
                                <div className={`list-item-data `}>
                                    <SiMastercard size={20}/>
                                </div>
                </Link>*/}
            </div>
        );
    }
}

export default Sell;
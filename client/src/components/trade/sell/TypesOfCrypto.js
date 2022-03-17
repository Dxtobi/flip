import React from 'react';
import { Link } from 'react-router-dom';
import { SiBitcoin, SiEthereum, SiXrp} from 'react-icons/si'
class TypesOfCrypto extends React.Component {

  
    
   
    
    render() {
        return (
            <div>
                <Link to='/sell/crypto/btc' className={`list-item Bitcoin`}>
                                <div className='list-item-data'>
                                   Bitcoin
                                </div>
                                <div className={`list-item-data`}>
                                    <SiBitcoin size={20}/>
                                </div>
                </Link>
                <Link to='/sell/crypto/xrp' className={`list-item XRP`}>
                                <div className='list-item-data'>
                                   Ripples
                                </div>
                                <div className={`list-item-data `}>
                                    <SiXrp size={20}/>
                                </div>
                </Link>
                <Link to='/sell/crypto/ltc' className={`list-item Litecoin`}>
                <div className='list-item-data'>
                                  Ethereum
                                </div>
                                <div className={`list-item-data `}>
                                    <SiEthereum size={20}/>
                                </div>
                </Link>
            </div>
        );
    }
}

export default TypesOfCrypto;
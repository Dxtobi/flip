import React from 'react';
import { SiBitcoin, SiXrp, SiLitecoin, SiEthereum, SiMastercard, SiGoogleplay } from 'react-icons/si';
//import {BsGraphUp } from 'react-icons/bs'
//import Link from 'react-router-dom/Link';

export default function ({coin}) {
    return (
            <div className={`box-red ${coin.type}`}>
                <div className="cont-body">
                    <div className="cont-body-content">
                    {
                        coin.type === 'Bitcoin' && <h4><SiBitcoin size={60}/></h4>
                    }
                    {
                        coin.type === 'Litecoin' && <h4><SiLitecoin size={60}/></h4>
                    }
                    {
                        coin.type === 'Ethurom' && <h4><SiEthereum size={60}/></h4>
                    }
                    {
                        coin.type === 'XRP' && <h4><SiXrp size={60}/></h4>
                    }
                    {
                        coin.type === 'Master' && <h4><SiMastercard size={60}/></h4>
                    }
                    {
                        coin.type === 'Google' && <h4><SiGoogleplay size={60}/></h4>
                    }
                    <div className="price-red">
                        <h3>{coin.amount}</h3>
                    </div>
                    <button className="button-invest">
                       Sell
                    </button>
                </div>
                </div>
            </div>
    )
}
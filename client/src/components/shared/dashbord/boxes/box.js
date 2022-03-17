import React from 'react';
import { SiBitcoin, SiXrp, SiLitecoin, SiEthereum, } from 'react-icons/si';
//import {BsGraphUp } from 'react-icons/bs'
import Link from 'react-router-dom/Link';

export default function ({ coin }) {
   // console.log(coin)
    return (
            <div className={`box-red ${coin.name}`}>
                <div className="cont-body">
                    <div className="cont-body-content">
                    {
                        coin.name === 'Bitcoin' && <h4><SiBitcoin size={60}/></h4>
                    }
                    {
                        coin.name === 'Litecoin' && <h4><SiLitecoin size={60}/></h4>
                    }
                    {
                        coin.name === 'Ethereum' && <h4><SiEthereum size={60}/></h4>
                    }
                    {
                        coin.name === 'XRP' && <h4><SiXrp size={60}/></h4>
                    }

                    { coin.offline ?
                        <div className="price-red">
                            Loading...
                        </div> :
                        <div className="priceInline">
                            <div className={
                                coin.metrics.market_data.percent_change_usd_last_24_hours < 1 &&'red'
                            }>{`${coin.metrics.market_data.percent_change_usd_last_24_hours.toFixed(2)}%`}</div> 
                            <div>{`USD ${coin.metrics.market_data.price_usd.toFixed(2)}`}</div>
                        </div>
                    }
                </div>
                </div>
                <div className="cont-footer">
                <Link to={`./cards/${coin.name}`}>
                    <button className="button-invest">
                       Buy
                    </button>
                </Link>
                </div>
            </div>
    )
}
import React from 'react';
//import Link from 'react-router-dom/Link';
import { SiBitcoin, SiXrp, SiEthereum } from 'react-icons/si';
import { FiDelete} from 'react-icons/fi';
import axios from 'axios'
class Invest extends React.Component {

    state = { 
        coins: [],
        showWalletId: false,
        showSent:false,
        btcAdd: [
            'bc1qzg6mp7lec4f2p77xnmjkdkjf4jj9fj85rky2mp',
            'bc1qmk736vnfrwz6pjkwksrhhf4mphrrtgzrgxcjfb',
        ],
        showTost: false,
        traId: "",
        errorb:false,
     };


    componentDidMount() {
        this.makeCalls()
        setInterval(this.makeCalls,10000)
    }
     makeCalls = () => {
        axios({
            method: 'get',
            url: 'https://data.messari.io/api/v2/assets',
        // responseType: 'stream'
        })
            .then((response) => {
                console.log(response.data.data)
                const crypto = this.getWantedCryptos(response.data.data);
                this.setState({coins:crypto})
               // console.log(crypto)
            }).catch(err => {
             console.log(err)
         })
    }
    getWantedCryptos = (data) => {
        let crypto = [];
        data.map((e) => {
            if (e.name === 'Bitcoin' || e.name === 'Ethereum' || e.name === 'XRP' || e.name === 'Litecoin') {
                return crypto.push(e)
            }
           // console.log(crypto)
            return crypto
        })
        return crypto
    }

    displayCryptoWallet = () => {

        setTimeout(() => {
            this.setState({showWalletId:!this.state.showWalletId})
        }, 1000);
        
    }
    displayCryptoWalletSent = () => {
      
            setTimeout(() => {
                this.setState({showSent:!this.state.showSent, showWalletId:false,  })
                //this.setState({showSent:!this.state.showSent, showWalletId:false })
            }, 1000);
    }

    displayCryptoWalletSentTrans = () => {
      
        if (this.state.traId.length>10) {
            setTimeout(() => {
                this.setState({showSent:false, showWalletId:false, showTost:true  })
                //this.setState({showSent:!this.state.showSent, showWalletId:false })
            }, 1000);
        } else {
            this.setState({ errorb: true })
       }
}

    //displayCryptoWalletSentTrans
    render() {
        const btc = Math.floor(Math.random() * this.state.btcAdd.length);
        return (
            <div className={`container my-container`}>
                <div>
                    {
                        this.state.showWalletId && (
                            <div className="btc-inv-model">
                                <button className="inv-btn" style={{ width: '40%' }} onClick={()=>this.displayCryptoWallet()}>close</button>
                                <small>Send btc to your Interest WalletID</small>
                                <small className="btc-inv-box">{this.state.btcAdd[btc]}</small>
                                <button className="inv-btn" style={{ width: '80%' }} onClick={() => this.displayCryptoWalletSent()}>sent</button>
                            </div>
                        )
                    }
                    {
                        this.state.showTost && (
                            <div className="alert_box green-border">
                                <div>Confirming... you would receive an email shortly </div>
                                <FiDelete onClick={() => this.setState({showTost:false})}/>
                            </div>
                        )
                    }
                    {
                        this.state.showSent && (
                            <div className="btc-inv-model">
                                <button className="inv-btn" style={{ width: '40%' }} onClick={()=>this.displayCryptoWalletSent()}>close</button>
                                <small>Send btc to your Interest WalletID</small>
                                <input onChange={(e)=>this.setState({traId:e.target.value})} className={`btc-inv-input-${this.state.errorb}`} value={ this.state.traId} placeholder="Enter Transaction id to confirm"/>
                                <button className="inv-btn" style={{ width: '80%' }} onClick={() => {
                                    this.displayCryptoWalletSentTrans()
                                 
                                }}>Confirm</button>
                            </div>
                        )
                    }
                    <section className="inv-sectn">
                        
                        <div className='inv-sectn-top'>
                            <h3>SILVER: 10%</h3>
                            
                        </div>
                        <small>Get back 10% of your investment daily  (14days), Deposit should be up to 0.0005BTC</small>
                        <div className="invest-div">
                            <div className="inv-box" >
                                                <SiBitcoin size={45} />
                                                <div>BTC</div>
                                                <div className={'green'}>5%</div>
                            </div>
                            <div className="inv-box" >
                                                <SiXrp size={45} />
                                                <div>XRP</div>
                                                <div className={'green'}>5%</div>
                            </div>
                            <div className="inv-box" >
                                                <SiEthereum size={45} />
                                                <div>ETH</div>
                                                <div className={'green'}>5%</div>
                            </div>
                        </div>
                        <button className="inv-btn" onClick={()=>this.displayCryptoWallet()}>SUBSCRIBE</button>
                    </section>
                    <section className="inv-sectn">
                    <div className='inv-sectn-top'>
                            <h3>GOLD: 10%</h3>
                            
                        </div>
                        <small>Get back 10% of your investment daily (14days), Deposit should be up to 0.005BTC</small>
                        <div className="invest-div">
                            <div className="inv-box" >
                                                <SiBitcoin size={45} />
                                                <div>BTC</div>
                                                <div className={'green'}>10%</div>
                            </div>
                            <div className="inv-box" >
                                                <SiXrp size={45} />
                                                <div>XRP</div>
                                                <div className={'green'}>5%</div>
                            </div>
                            <div className="inv-box" >
                                                <SiEthereum size={45} />
                                                <div>ETH</div>
                                                <div className={'green'}>10%</div>
                            </div>
                        </div>
                        <button className="inv-btn" onClick={()=>this.displayCryptoWallet()}>SUBSCRIBE</button>
                    </section>
                    <section className="inv-sectn">
                    <div className='inv-sectn-top'>
                            <h3>DIAMOND: 50%</h3>
                           
                        </div>
                        <small>Get back 50% of your investment daily (21days), Deposit should be up to 0.05BTC</small>
                        <div className="invest-div">
                            <div className="inv-box" >
                                                <SiBitcoin size={45} />
                                                <div>BTC</div>
                                                <div className={'green'}>25%</div>
                            </div>
                            <div className="inv-box" >
                                                <SiEthereum size={45} />
                                                <div>XRP</div>
                                                <div className={'green'}>10%</div>
                            </div>
                            <div className="inv-box" >
                                                <SiXrp size={45} />
                                                <div>ETH</div>
                                                <div className={'green'}>15%</div>
                            </div>
                        </div>
                        <button className="inv-btn" onClick={()=>this.displayCryptoWallet()}>SUBSCRIBE</button>
                    </section>
                </div>
            </div>)
    }
}

export default Invest;
import React from 'react';
import { connect } from 'react-redux'
import {BsFillInfoSquareFill} from 'react-icons/bs'

class PreOrderForm extends React.Component {
    state = { 
        accDetails: {
            balance: 30000,
            accType: 'level1',
            Btc: 0.9003,
            Ltc: 1.300,
            Xrp:2032
        },
        amount: 0,
        rm: 30000,
        ofPrice: 0,
        assets: ['BTC', 'LTC', 'XRP', 'Amazon Gift eCard', 'Google Gift eCard', 'iTunes Gift eCard', 'Xbox Gift eCard'],
        paywith: ['USD', 'BTC', 'LTC', 'XRP'],
        formdata: {
            asset: 'BTC',
            paywith: 'USD',
            amount:0
        },
        show: false,
        showInfo:false
    }
    onChangePrePurchase(e) {
        let inp = parseInt(e.target.value, 10)
        let ballance = this.state.accDetails.balance - inp

        this.setState({
            ofPrice: e.target.value,
            rm:isNaN(ballance)?this.state.accDetails.balance:ballance < 0  ? 'insufficient fund':ballance
        })

    }
    cP() {
        if (this.state.ofPrice > 9) {
            this.setState({
                show:!this.state.show
            })
        }

    }
    onSelectAsset(e) {

        this.setState({formdata:{asset:e.target.value, paywith:this.state.formdata.paywith}}) 
    }
    onSelectPayWith(e) {

        this.setState({formdata:{paywith:e.target.value, asset:this.state.formdata.asset}}) 
    }
    render() {
        const pay = this.state.formdata.paywith
        const show = this.state.show
        return (
            <div className='form-block' style={{textAlign:'center'}}>
                <div >
                     <div className='amount-user-ballance'>$50,000</div>
                </div>
               
                <div className='confermPay' style={{ display: `${show ? 'block' : 'none'}` , padding:10}}>
                    <button onClick={() => {this.cP()}} className='buy-button' style={{marginBottom:40, boxShadow:'none'}} >
                       CLOSE
                    </button>
                <button className='buy-button' style={{marginTop:10, boxShadow:'none'}}>
                        {
                            pay === 'BTC' ?
                                'BTC : Btinnjs9nue0ue92j20220c7u' :
                                pay === 'LTC' ?
                                    'LTC : L7nt0j45T$993ijgjeiikdkjd' :
                                    pay === 'XRP' ?
                                'XRP : Xksoo0ik29dj8hd729q2yx72':`Continue the payment of $${this.state.ofPrice} with`
                        }
                    </button>
                    {
                        pay === 'USD' &&(
                            <div style={{ marginTop: 20 }}>
                            <button onClick={() => { this.cP() }} className='buy-button' style={{ marginBottom: 40, boxShadow: 'none' }} >
                                    Paystack
                            </button>
                            <button onClick={() => { this.cP() }} className='buy-button' style={{ marginBottom: 40, boxShadow: 'none' }} >
                                    Debit card
                            </button>
                            <button onClick={() => { this.cP() }} className='buy-button' style={{ marginBottom: 40, boxShadow: 'none' }} >
                              PayPal
                            </button>
                        </div>)
                    }
                </div>
              <br/>
                <h5>Asset to pre-order</h5>
                <select name='asset' className='buy-input-form'  onChange={(e) => {this.onSelectAsset(e)}}>
                    {
                        this.state.assets.map((a, i) => {
                            return (<option key={i} value={a}>{a}</option>)
                        })
                    }
                </select>
                <h5>You are paying in ?</h5>
                <select name='pay' className='buy-input-form' onChange={(e) => { this.onSelectPayWith(e) }}>
                    {
                        this.state.paywith.map((a, i) => {
                            return (<option style={{borderRadius:20}} key={i} value={a}>{a}</option>)
                        })
                    }
                </select>
                <h5>Enter price in USD <small>At list $10</small></h5>
                <input placeholder='' value={this.state.ofPrice} type='number' onChange={(e) => this.onChangePrePurchase(e)} className='buy-input-form' name='ofPrice' />
              
              
                <button onClick={() => { this.cP() }} className={`buy-button ${this.state.formdata.asset === this.state.formdata.paywith ? 'rb' : ''}`} disabled={this.state.formdata.asset === this.state.formdata.paywith ? true : false}>Pre-order</button><br />
                <div onClick={()=>{this.setState({showInfo :!this.state.showInfo})}}><BsFillInfoSquareFill size={ 25} color='green'/></div>
                {
                    this.state.showInfo && (
                        <p style={{ padding: 10 }}>
                            when you make a pre-order funds will be debited from your account or you will be required to deposit into a holding account
                        and your request will be added to the que for pre-other purchase<br />
                        as soon as there is a sale that meets your target amount the purchase will be
                         made automatically and the asset will be sent to your private wallet.
                            <br/>
                            <div className='buy-input-form' onClick={() => { this.setState({ showInfo: !this.state.showInfo }) }}>I understand</div>
                 </p>
                    )
               }
                
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        prop: state.prop
    }
}
export default connect(mapStateToProps)(PreOrderForm)
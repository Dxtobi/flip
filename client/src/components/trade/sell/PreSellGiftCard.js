import React from 'react';
import { connect } from 'react-redux'
//import {BsFillInfoSquareFill} from 'react-icons/bs'

class PreSellGiftCard extends React.Component {
    state = { 
       
        valueOfCurrency: '',
        cardNumber: '',
        cardType:'',
        expireDate:'',
        ccv:'',
    }
    
    cP() {
       let data = {
            valueOfCurrency: this.state.valueOfCurrency,
            cardNumber: this.state.cardNumber,
            holdersName:this.state.holdersName,
            expireDate:this.state.expireDate,
            ccv:this.state.ccv,
        }
        console.log(data)

    }
   
    onChangePrePurchase(e) {
       

        this.setState({
           [e.target.name]:e.target.value
        })

    }
    render() {
        
        return (
            <div className='form-block' style={{ textAlign: 'center' }}>
                <div className='price-info'>1 FLC = 1 USD($)</div>
              
                <div style={{
                    width: '90%',
                    margin:'auto'
                }}>
                        <small>Value in USD($)</small>
                        <input placeholder='$100'
                            value={this.state.valueOfCurrency}
                            type='number'
                            onChange={(e) => this.onChangePrePurchase(e)}
                            className='buy-input-form'
                            name='valueOfCurrency' />

                        <small>CARD CODE</small>
                        <input placeholder='`555-5555-5555`'
                            value={this.state.cardNumber}
                            type='number'
                            onChange={(e) => this.onChangePrePurchase(e)}
                            className='buy-input-form'
                            name='cardNumber' />

                        <small>Card Type</small>
                        <input placeholder='Steam' value={this.state.cardType}
                            type='text'
                            onChange={(e) => this.onChangePrePurchase(e)}
                            className='buy-input-form'
                            name='cardType' />

                    
                    
                        <small>A clear photos of both back and front</small>
                        <input type='file' placeholder='Upload files' className='file-input' name='c1'/>
                        <input type='file' placeholder='Upload files' className='file-input' name='c2'/>
                    
                        <button onClick={() => { this.cP() }} className={`buy-button`}>SELL</button><br />

                        <div className='form-block' style={{ textAlign: 'center' }}>
                            <b>NOTE:</b> none of this information would be public.
                            the information  you entered are only available to the
                            purchaser of your 
                            listed item.
                        </div>
                    </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        prop: state.prop
    }
}
export default connect(mapStateToProps)(PreSellGiftCard)
import React from 'react';
import { connect } from 'react-redux'
//import {BsFillInfoSquareFill} from 'react-icons/bs'


class PreSoldCrypto extends React.Component {
    
    state = { 
       
        valueOfCurrency: '',
        cardNumber: '',
        holdersName:'',
        expireDate:'',
        ccv: '',
        cryptoid: '5fs6768BHV789d8cna9wckjd3na',
        
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
        const cryptType = this.props.match.params.type?this.props.match.params.type:'Loading...'
        return (
            <div className='form-block' style={{ textAlign: 'center' }}>
                <div className='price-info'>
                    <h3>You have</h3>
                    <h1>0.00<div style={{textTransform:'uppercase'}}>{cryptType}</div></h1>
                </div>
              
                <small className="red">You can sell what you dont have.</small>
                <input placeholder='30'
                    value={this.state.valueOfCurrency}
                    type='number'
                    onChange={(e) => this.onChangePrePurchase(e)}
                    className='buy-input-form'
                    name='valueOfCurrency'
                    disabled
                    />

                <button onClick={() => { this.cP() }} className={`buy-button `}>SELL</button><br />

                <div className='form-block' style={{ textAlign: 'center' }}>
                    <b>NOTE:</b> This creates a card on the market 
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
export default connect(mapStateToProps)(PreSoldCrypto)
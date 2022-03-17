import React from 'react';
import { connect } from 'react-redux'
import {sellVCard} from '../../../actions/Trade'
import { clearErrors } from '../../../actions/authActions'

class PreSold extends React.Component {

    state = { 
        valueOfCurrency: '',
        cardNumber: '',
        holdersName:'',
        expireDate:'',
        ccv:'',
        next:0
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    cP() {
        const {valueOfCurrency, cardNumber, holdersName, expireDate, ccv}=this.state
        if (valueOfCurrency === '' || cardNumber === '' || expireDate === '' || ccv === '') {
            console.log('empty')
            return
        }
       let data = {
            valueOfCurrency: valueOfCurrency,
            cardNumber: cardNumber,
            holdersName:holdersName,
            expireDate:expireDate,
            ccv:ccv,
        }
        console.log(data);
        this.props.clearErrors()
        this.props.sellVCard(data)
    }

    handleNext = () => {
        this.setState({ next: this.state.next > 3 ? 0 : this.state.next + 1 })
        
    }
    handlePrev = () => {
        this.setState({next:this.state.next === 0?4:this.state.next-1})
    }
    onChangePrePurchase(e) {

        this.setState({
           [e.target.name]:e.target.value
        })

    }
    render() {

        const {next}= this.state
        if(next===0)
        {
            return (
            <div className='form-block' style={{ textAlign: 'center' }}>
                <div className='price-info'>1 FLC = 1 USD($)</div>
                <small>Value in USD($)</small>
                <input placeholder='$100'
                    value={this.state.valueOfCurrency}
                    type='number'
                    onChange={(e) => this.onChangePrePurchase(e)}
                    className='buy-input-form'
                        name='valueOfCurrency' />
                    
                    <div className='btn-holder-sell'><button onClick={() => { this.handleNext() }} className={`buy-button`}>Next</button></div>
                    
            </div>
        )
        }
        if (next === 1) {
            return (
                <div className='form-block' style={{ textAlign: 'center' }}>
                    <small>CARD NUMBER</small>
                    <input placeholder='5035 3452 4522 123'
                    value={this.state.cardNumber}
                    type='number'
                    onChange={(e) => this.onChangePrePurchase(e)}
                    className='buy-input-form'
                        name='cardNumber' />
                    
                    <div className='btn-holder-sell'>
                        <button onClick={() => { this.handlePrev() }} className={`buy-button`}>Back</button>
                        <button onClick={() => { this.handleNext() }} className={`buy-button`}>Next</button>
                    </div>
                    
                </div>
            );
        }
        if (next === 2) {
            return (
                <div className='form-block' style={{ textAlign: 'center' }}>
                     <small>NAME ON CARD(optional)</small>
                    <input placeholder='James Bond' value={this.state.holdersName}
                        type='text'
                        onChange={(e) => this.onChangePrePurchase(e)}
                        className='buy-input-form'
                        name='holdersName' />
                   <div className='btn-holder-sell'>
                        <button onClick={() => { this.handlePrev() }} className={`buy-button`}>Back</button>
                        <button onClick={() => { this.handleNext() }} className={`buy-button`}>Next</button>
                    </div>
                </div>
            );
        }
        if (next === 3) {
            return (
                <div className='form-block' style={{ textAlign: 'center' }}>
                   <div className='input-liner'>
                    <input placeholder='mm/yy'
                        value={this.state.expireDate}
                        type='text'
                        onChange={(e) => this.onChangePrePurchase(e)}
                        className='card-input-small'
                        name='expireDate' />
                    <input placeholder='CCV'
                        value={this.state.ccv}
                        type='number'
                        onChange={(e) => this.onChangePrePurchase(e)}
                        className='card-input-small'
                        name='ccv' />
                    </div>
                    <div className='btn-holder-sell'>
                        <button onClick={() => { this.handlePrev() }} className={`buy-button`}>Back</button>
                        <button onClick={() => { this.handleNext() }} className={`buy-button`}>Next</button>
                    </div>
                </div>
            );
        }
        if (next === 4) {
            return (
                <form className='form-block' style={{ textAlign: 'center' }}>
                    <small>A clear photos of both back and front</small>
                    <input type='file' placeholder='Upload files' className='file-input' multiple/>

                    <div className='btn-holder-sell'>

                        <button onClick={() => { this.handlePrev() }} className={`buy-button`}>Back</button>

                        <button onClick={() => { this.cP() }} className={`buy-button`}>SELL</button>

                    </div>
                    {this.props.errors.error && <small className='error-div'>{ this.props.errors.error}</small>}
                </form>
            );

        }
    }
}
const mapStateToProps = (state) => {
    return {
        all: state,
        errors: state.errors,
    }
}
export default connect(mapStateToProps, {clearErrors, sellVCard})(PreSold)

/**
 * 
 * <div className='form-block' style={{ textAlign: 'center' }}>
                <div className='price-info'>1 FLC = 1 USD($)</div>
              
                <small>Value in USD($)</small>
                <input placeholder='$100'
                    value={this.state.valueOfCurrency}
                    type='number'
                    onChange={(e) => this.onChangePrePurchase(e)}
                    className='buy-input-form'
                    name='valueOfCurrency' />

                <small>CARD NUMBER</small>
                <input placeholder='5035 3452 4522 123'
                    value={this.state.cardNumber}
                    type='number'
                    onChange={(e) => this.onChangePrePurchase(e)}
                    className='buy-input-form'
                    name='cardNumber' />

                <small>NAME ON CARD(optional)</small>
                <input placeholder='James Bond' value={this.state.holdersName}
                    type='text'
                    onChange={(e) => this.onChangePrePurchase(e)}
                    className='buy-input-form'
                    name='holdersName' />

                <div className='input-liner'>
                    <input placeholder='mm/yy'
                        value={this.state.expireDate}
                        type='text'
                        onChange={(e) => this.onChangePrePurchase(e)}
                        className='card-input-small'
                        name='expireDate' />
                    <input placeholder='CCV'
                        value={this.state.ccv}
                        type='number'
                        onChange={(e) => this.onChangePrePurchase(e)}
                        className='card-input-small'
                        name='ccv' />
                </div>
               
                <small>A clear photos of both back and front</small>
                <input type='file' placeholder='Upload files' className='file-input' />
               
                <button onClick={() => { this.cP() }} className={`buy-button`}>SELL</button><br />

                <div className='form-block' style={{ textAlign: 'center' }}>
                    <b>NOTE:</b> none of this information would be public.
                    the information  you entered are only available to the
                     purchaser of your 
                    listed item.
                </div>
            </div>
 */
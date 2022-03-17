import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buyFtt } from '../../../actions/Trade';
//import Link from 'react-router-dom/Link';


class BuyCards extends Component {
    state = {
        trn: false,
        cm: false,
        endt: false,
        cancel:false
    }

    componentDidUpdate() {
        const { cancel, endt } = this.state
       
        if (cancel || endt) {
            this.setState({
                trn: false,
                cm: false,
                endt: false,
                cancel:false
            })
            //let x=navigator.getBattery()
            //console.log(x)
            this.props.history.goBack()
        }
    }

    trade = () => {

        let amt = this.props.match.params.amount
        let price = this.props.location.query.price
        console.log('called')
            let data = {
                type: 'payment',
                par: price,
                amount:amt / price
            }

            this.props.buyFtt(data)
            console.log('end called')
    }
    render() {
        let amt = this.props.match.params.amount
        let price = this.props.location.query.price?this.props.location.query.price:30
        if (this.state.trn) {
           return ( <div className='confirm_page'>
                <div>
                    Ok then please Wait for confirmation
                    this should take at least a minute or two.
                   <button className='login-form-input' onClick={() => {
                       this.setState({ trn: !this.state.trn })
                       return this.props.history.goBack()
                   }}>OK</button>
                </div>
            </div>)
        } else {
            return (
                <div className='form-block'>
                    <div className='Header-chat' >
                        <button className="Header-btn" onClick={()=>this.props.history.goBack()}>Back</button>
                        <div className='Header-name'>Handrew Bricks</div>
                        {
                            this.state.cm ? <div>Trade under Review</div>:<div></div>
                        }
                    </div>
                   
                    <div className='chat-container'>
                        <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>Buying {amt} FTC</div>
                        <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>Paying {amt / price}USD</div>
                        <div className="chatbobble-reciver">
                            Make payment via account details provided below
                            please do not click on Transferred if you are not sure it was successful.
                            <div>222334444433</div>
                            <div>KUDA BANK</div>
                            <div>Handrew Bricks</div>
                        </div>
    
                        <div className="chatbobble-reciver">
                           you can use my pay link for card payment bellow.
                          <br/><a href='https://www.payme.com/we_fjfdjn43j303' style={{color:'green'}}>Handrew Bricks</a>
                        </div>
                        
                        
                        <div className="chatbobble-sender">
                            
                            <button className="chatbobble-sender-pre" onClick={() => {
                                this.setState({ trn: !this.state.trn })
                                return this.trade()
                            }}>Transferred</button>
                            <button className="chatbobble-sender-pre" onClick={()=>this.setState({cm:!this.state.cm})} >Call Moderator</button>
                            <button className="chatbobble-sender-pre" onClick={()=>this.setState({endt:!this.state.endt})}>End Trade</button>
                            <button className="chatbobble-sender-pre"  onClick={()=>this.setState({cancel:!this.state.cancel})}>Cancel</button>
                        </div>
    
    
                    </div>
    
                </div>
            );
       }
    }
}

const mapStateToProps = (state) => {
    return {
        allData: state
    }
}
export default connect(mapStateToProps, {buyFtt})(BuyCards)


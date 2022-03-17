import React from 'react';
import { AiOutlineCheck, AiOutlineClose} from 'react-icons/ai';
import { Redirect } from 'react-router-dom';
//import { Link } from 'react-router-dom';
//import { SiFlutter, SiPaypal } from 'react-icons/si';


class DepositMenu extends React.Component {

    state = { 
        btc_address: '',
    };

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, ins:false })
    }
    saveBankDetails = () => {
        if (this.state.amount > this.state.ballance) {
            this.setState({ins:true})
            return
        }
        let data = {
            bankName:this.state.bankName,
            accountName:this.state.accountName,
            accountNumber: this.state.accountNumber,
            amount:this.state.amount
        }
        this.setState({next:true})
        console.log(data)

    }
    submit = () => {

            this.handleSent()

    }
    handleSent = () => {
        this.setState({next:false, notSent:false, redirect:true, sent:true})
    }
    handleNotSent = () => {
        this.setState({next:false, notSent: true, redirect:false, sent:false})
    }
    handleRedirect = () => {
        this.setState({next:false, sent:false, notSent:false, redirect:true})
    }
    handleNext = () => {
        this.setState({next:false, notSent:false, redirect:false, sent:false})
    }
    render() {
        if (this.state.next) {
            return <PinModel
                state={this.state} 
                handleChange={this.handleInputChange}
                submit={this.submit}
            />
        }
        if (this.state.redirect) {
            return <Redirect to='/profile'/>
        }
        if (this.state.sent) {
            return <Sent handleRedirect={this.handleRedirect}/>
        }
        if (this.state.notSent) {
            return <NotSent handleNext={this.handleNext}/>
        } 
            return (
                <div>
                    <div className='input-container'>
                        <div className='funds-display'>{this.state.ballance}</div>
                        <input type='text' required onChange={this.handleInputChange} className='deposit-input' placeholder='Btc Address ' name='btc_address' value={this.state.amount} />
                    </div>
                    <div onClick={this.saveBankDetails} className='list-item'>
                        Next
                    </div>
                </div>
            )
    }
}

export default DepositMenu;

 const PinModel=(e)=>{
    return (
        <div className='withdrawer-model'>
           Please Await Confirmation!
            <button onClick={e.submit} className='list-item'>Ok</button>
        </div>
    )
}

const Sent=(e)=>{
    return (
        <div className='withdrawer-model'>
            <div className='sent-con bg-green'><AiOutlineCheck size={45}/></div>
            <h3  className='sent-con-msg green'>Your transaction was successful</h3>
            <button onClick={e.handleRedirect} className='list-item'>Ok</button>
        </div>
    )
}
const NotSent=(e)=>{
    return (
        <div className='withdrawer-model'>
            <div className='sent-con bg-red'><AiOutlineClose size={45}/></div>
            <h5 className='sent-con-msg red'>Something went wrong</h5>
            <button onClick={e.handleNext} className='list-item'>Ok</button>
        </div>
    )
}
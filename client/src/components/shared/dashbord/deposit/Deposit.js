import React from 'react';
//import { Link } from 'react-router-dom';
import { SiFlutter } from 'react-icons/si';
import FuterWave from '../../../payments/FuterWave'
class DepositMenu extends React.Component {

    state = { 
        fluter: false,
        paypal: false,
        amount: '',
        disable:true
    };

    handleInputChange = (e) => {
        this.setState({
            fluter: false,
            amount: parseInt(e.target.value, 10),
            disable:parseInt(e.target.value, 10) < 500 || parseInt(e.target.value, 10) > 500000  ? true :false
        })

    }
    render() {
        return (
            <div>
                <div className='input-container'>
                    <input onChange={this.handleInputChange} className='deposit-input' placeholder='amount ' name='amount' value={isNaN(this.state.amount) ?'':this.state.amount} />
                    <div className='limit-text'><div className={this.state.disable ? 'red' : ''}>min:500</div><div className={this.state.disable ? 'red' : ''}>max:500000</div></div>
                </div>
                <div onClick={() => {
                    this.setState({fluter:true})
                }} className='list-item'>
                                <div className='list-item-data '>
                                    <SiFlutter size={ 25}/> 
                                </div>
                                <div className='list-item-data'>
                                      With Flutter
                                </div>
                </div>
                {this.state.fluter && this.state.disable === false? <FuterWave/>:null}
            </div>
        );
    }
}

export default DepositMenu;
import React, { Component } from 'react'
import { connect } from 'react-redux'

class SellCards extends Component {
    state = { 
        currentEmail: 'musterfa@gmail.com',
        newEmail: '',
        password:''
    }
    
    handleInput = (e) => {
      
        this.setState({ [e.target.name]: e.target.value })
        
    }
    render() {
        return (
            <div className='model'>
                <div className='model-header'>Change Email</div>
                <div className='model-Body'>
                    <div className='model-body-item green' >
                        <input disabled type='email' className='input-comp' onChange={this.handleInput} placeholder='Current Email' value={this.state.currentEmail} name='currentEmail' />
                    </div>
                    <div  className='model-body-item green' >
                        <input required className='input-comp' onChange={this.handleInput} placeholder='New Email' value={this.state.newEmail } name='newEmail' />
                    </div>
                    <div  className='model-body-item green' >
                        <input required type='email' className='input-comp'  onChange={this.handleInput} placeholder='password' value={this.state.password } name='password' />
                    </div>
                    <div    className='model-body-item green' >Change</div>
                </div>
                <div onClick={() => { this.props.cancel() }} className='model-footer'>Close</div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        prop: state.prop
    }
}
export default connect(mapStateToProps)(SellCards);
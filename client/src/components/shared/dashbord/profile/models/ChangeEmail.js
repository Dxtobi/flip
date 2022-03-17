import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeMail, clearErrors } from '../../../../../actions/authActions'

class ChangeEmail extends Component {
    state = { 
        currentEmail: 'musterfa@gmail.com',
        newEmail: '',
        password: '',
        thisError:''
    }
    
    handleInput = (e) => {
      
        this.setState({ [e.target.name]: e.target.value, thisError:'' })
       this.props.clearErrors()
    }
    handleSubmit = () => {
        if (this.props.data.email === this.state.newEmail) {
            this.setState({ thisError: 'same Email' });
            return 
        }
        if (this.state.newEmail === '') {
            this.setState({ thisError: 'New email field required' });
            return
        }
        if (this.state.password === '') {
            this.setState({ thisError: 'password needed' });
            return
        }
        this.props.changeMail(this.state)

    }

    render() {
        return (
            <div className='model'>
                <div className='model-header'>Change Email</div>
                <div className='model-Body'>
                    <div className='model-body-item green' >
                        <input disabled type='email' className='input-comp' onChange={this.handleInput} placeholder='Current Email' value={this.props.data.email} name='currentEmail' />
                    </div>
                    <div  className='model-body-item green' >
                        <input required className='input-comp' onChange={this.handleInput} placeholder='New Email' value={this.state.newEmail } name='newEmail' />
                    </div>
                    <div  className='model-body-item green' >
                        <input required type='password' className='input-comp'  onChange={this.handleInput} placeholder='password' value={this.state.password } name='password' />
                    </div>
                    {this.state.thisError !== '' && <small className='error-display'>{this.state.thisError}</small>}
                    {this.props.errors.email && <small className='error-display'>{this.props.errors.email}</small>}
                    {this.props.errors.password && <small className='error-display'>{ this.props.errors.password}</small>}
                    <div  onClick={this.handleSubmit}  className='model-body-item green' >Change</div>
                </div>
                <div onClick={() => { this.props.cancel() }} className='model-footer'>Close</div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}
export default connect(mapStateToProps, {changeMail, clearErrors})(ChangeEmail);
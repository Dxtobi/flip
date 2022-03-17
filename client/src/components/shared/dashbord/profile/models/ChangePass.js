import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePassword, clearErrors } from '../../../../../actions/authActions'
class ChangePass extends Component {
    
    state = { 
        password: '',
        newPassword: '',
        thisError:''
    }
   


    handleInput = (e) => {
      
        this.setState({ [e.target.name]: e.target.value, thisError:'' })
        this.props.clearErrors()
    }
    handleSubmit = () => {
        if (this.state.password === '' || this.state.newPassword === '') {
            this.setState({ thisError: 'empty password' });
            return 
        }
        if (this.state.password.length < 8 || this.state.newPassword.length < 8) {
            this.setState({ thisError: 'Invalid password length' });
            return
        }
        if (this.state.password === this.state.newPassword) {
            this.setState({ thisError: 'Same password' });
            return
        }
        this.props.changePassword(this.state)
    }


    render() {
        return (
            <div className='model'>
                <div className='model-header'>Change password</div>
                <div className='model-Body'>
                    <div className='model-body-item green' >
                        <input type='password' className='input-comp' onChange={this.handleInput} placeholder='Current password' value={this.state.password } name='password' />
                    </div>
                    <div  className='model-body-item green' >
                        <input className='input-comp' onChange={this.handleInput} placeholder='New password' value={this.state.newPassword } name='newPassword' />
                    </div>
                    {this.state.thisError !== '' && <small className='error-display'>{this.state.thisError}</small>}
                   
                    {this.props.errors.password && <small className='error-display'>{ this.props.errors.password}</small>}

                    <div onClick={this.handleSubmit} className='model-body-item green' >Change</div>
                </div>
                <div onClick={() => { this.props.cancel() }} className='model-footer'>Close</div>
                {this.props.reqStatus === 200 && this.props.cancel()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        errors: state.errors,
        reqStatus:state.requestStatus
    }
}
export default connect(mapStateToProps,{ changePassword, clearErrors})(ChangePass);
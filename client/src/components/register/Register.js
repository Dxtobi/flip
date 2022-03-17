import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {registerUser, clearErrors} from '../../actions/authActions'



class Register extends Component {
   
    state = {
        password: '',
        fullName: '',
        email: '',
        phone: '',
        username:''
    };

    componentDidMount() {
        this.props.clearErrors()
    }

    handleChangeInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleRegister = (e) => {
        e.preventDefault()
        this.props.registerUser(this.state, this.props.history)
       // console.log(this.props)
    }
    render() {
        return (
            <div className='login'>
                <div className='brand-name-login'>
                    Welcome
                </div>
                <form className='login-form'>
                    <input className='login-form-input' onChange={this.handleChangeInput} type='text' name='fullName' value={this.state.fullName} placeholder='Full Name' required />
                    {this.props.errors.fullName && <small className='error-display'>{this.props.errors.fullName}</small>}
                    <input className='login-form-input' onChange={this.handleChangeInput} type='text' name='username' value={this.state.username} placeholder='Username' required />
                    {this.props.errors.username && <small className='error-display'>{this.props.errors.username}</small>}
                    <input className='login-form-input' onChange={this.handleChangeInput} type='email' value={this.state.email} name='email' placeholder='Email' required />
                    {this.props.errors.email && <small className='error-display'>{this.props.errors.email}</small>}
                    <input className='login-form-input' onChange={this.handleChangeInput} type='phone' value={this.state.phone} name='phone' placeholder='Phone' required />
                    {this.props.errors.phone&& <small className='error-display'>phone error</small>}
                    <input className='login-form-input' onChange={this.handleChangeInput} type='password' value={this.state.password} name='password' placeholder='Password' required />
                    {this.props.errors.password&& <small className='error-display'>password error</small>}
                    <button className='login-form-input' onClick={this.handleRegister}>Register</button>

                    <Link  to='/login'>
                        <button className='login-form-input' style={{ width: '60%' }}>Login</button>
                    </Link>
                </form>

                <div style={{textAlign:'center',  margin:'auto', padding:30}}>

                    by singing up it means you have agreed with our <Link  to='/register'>Terms & Condition
                    </Link>
                </div>
                  
            </div>
        );
    }
}
const mapStateToProps = ( state ) => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect( mapStateToProps, { registerUser,clearErrors } )( Register );
//export default Register;
import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, clearErrors } from '../../actions/authActions';

class Login extends Component {
   
    state = {
        password: '',
        email: '',
    };

    handleChangeInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }




    componentWillReceiveProps( nextProps ){

            if( nextProps.auth.isAuthenticated ){
                this.props.history.push( '/' );
            }
    }
    
    componentDidMount() {
        this.props.clearErrors();
        if( this.props.auth.isAuthenticated ){
            this.props.history.push( '/home' );
        }
        console.log(this.props)
    }
    
    handleLoginUser = (e) => {
        e.preventDefault()
        this.props.loginUser(this.state)
       // console.log(this.props)
    }
    render() {
        return (
            <div className='login'>
                <div className='brand-name-login'>
                    Login
                </div>
                <form className='login-form'>
                    {this.props.errors.email && <small className='error-display'>Oh! Oh! wrong info</small>}
                    {this.props.errors.password && <small className='error-display'>Oh! Oh! wrong info</small>}
                    <input onChange={this.handleChangeInput} className='login-form-input' type='email' name='email' placeholder='Email' required/>
                    
                    <input onChange={this.handleChangeInput} className='login-form-input' type='password' name='password' placeholder='Password' required />
                    
                    <button className='login-form-input' onClick={this.handleLoginUser}>Login</button>
                    <Link  to='/register'>
                        <button className='login-form-input' style={{ width: '60%' }}>Register</button>
                    </Link>
                </form>
                
               
                  
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    errors: state.errors
  });

  export default connect( mapStateToProps, { loginUser, clearErrors } )( Login );
//export default Register;
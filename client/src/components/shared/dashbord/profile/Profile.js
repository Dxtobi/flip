import React, { Component } from 'react'
import Link from 'react-router-dom/Link';
import ChangeEmail from './models/ChangeEmail';
import ChangePass from './models/ChangePass';
import Trans from './models/Trans';
import VerifyAccount from './models/VeryfiAccount';
import {getProfile, logoutUser, getTransactions, clearStatus} from '../../../../actions/authActions'
import { connect } from 'react-redux'
import Loading from '../../Loading';

class Profile extends Component {
    state = { 
        model: {
            trans: false,
            changePass: false,
            changeEmail: false,
            verify:false
        },
        profile:{}
    }

    
    componentDidMount() {
        this.props.getProfile()
        this.props.getTransactions()
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.profile)
        this.setState({
            profile:nextProps.profile.profile
        })
    }
    
    cancelModel = () => {
        this.setState({
            model: {
                trans: false,
                changePass: false,
                changeEmail: false,
                verify:false
            }
        })
        this.props.clearStatus()
    }

    render() {
        const {profile} = this.state
        if (this.props.profile.loading) {
            return(<Loading/>)
        }
        return (
            <div>
                <div className='name-holder'>{profile.username}</div>
                <div className='top-container-profile'>
                    <div  className='profile-top'>
                        <h2 >
                            USD {profile.flipBallance}
                        </h2>
                    </div>
                    <div className='profile-top-footer'>
                            <Link to='/Invest' className='profile-top-footer-item'>Invest</Link>
                            <Link to='/withdraw' className='profile-top-footer-item'>Withdraw</Link>
                    </div>
               </div>
              
                <div className='profile-list'>
                <Link to='/transactions' className='profile-list-item'>View Transactions</Link>

                    {
                      this.state.model.trans && <Trans trans={this.props.profile.transaction} cancel={this.cancelModel}/>
                    }

                    <div onClick={ ()=>this.setState({model:{changePass:!this.state.model.changePass}})} className='profile-list-item'>
                        <div style={{color:'gray'}} to=''>Change password</div>
                    </div>
                    {
                      this.state.model.changePass && <ChangePass cancel={this.cancelModel}/>
                    }
                    <div onClick={ ()=>this.setState({model:{changeEmail:!this.state.model.changeEmail}})} className='profile-list-item'>
                        <div style={{color:'gray'}} to=''>Change Email</div>
                    </div>
                    {
                      this.state.model.changeEmail && <ChangeEmail data={ profile } cancel={this.cancelModel}/>
                    }
                    <div onClick={ ()=>this.setState({model:{verify:!this.state.model.verify}})} className='profile-list-item'>
                        <div to='' style={{color:'gray'}}>Verify Account</div>
                    </div>
                    {
                        this.state.model.verify && <VerifyAccount data={ profile } cancel={this.cancelModel}/>
                    }

                    <Link to='/invite&earn' className='profile-list-item'>Invite & Earn</Link>
                    <div onClick={ this.props.logoutUser }  className='profile-list-item'>
                        <div to='' style={{color:'gray'}}>Log out</div>
                    </div>

                </div>
            </div>
        );
    }
}
const mapStateToProps = ( state ) => ({
    auth: state.auth,
    profile:state.profile
  });

export default connect( mapStateToProps, {  getTransactions, clearStatus, getProfile, logoutUser } )( Profile );
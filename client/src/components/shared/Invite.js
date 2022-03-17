import React, { Component } from 'react'

//import TopSection from './TopSection';
import {getInvitationCode} from '../../actions/authActions';
//import {getProfile, logoutUser, getTransactions, clearStatus} from '../../../../actions/authActions'
import { connect } from 'react-redux'
class InviteAndEarn extends Component {

       state = { 
           
         };
   
    componentDidMount() {
        this.props.getInvitationCode()
   }
   
    copy = (ic) => {
        console.log(window)
        window.navigator.clipboard.writeText(ic)

    }
   
    render() {

        console.log(this.props.profile)
        let ic = this.props.profile.inviteCode;
        let ip = this.props.profile.invitePoint;
        return (
            <div className='landing-page'>
                <div className="inv-disc">
                    your gmail can also be your invite code <br/><br/>
                    Invite your friends and earn up 10 FLC on your first 5 invite
                    ( account must be fully verify and transaction should be made).

                </div>
                <br />
                <br />
                {
                    ip === 0 ? (
                        <div className='inf-info'>
                            No invite yet<br/>{ip}
                        </div>
                    ) : (
                        <div className='inf-info'>
                            invite point<br/>{ip}
                        </div>
                    )
               }


                <br />
                <br />
                {
                    ic === 'XXXXXX'?(<div onClick={()=>this.props.getInvitationCode()} className='inv-info-btn'>
                    Get Invite Code
                    </div>) : (
                        <div onClick={()=>this.copy(ic)}  className='inv-info-btn'>
                    {ic}<br/><small>click to copy</small>
                </div>
                )
                }
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    profile:state.profile.profile
  });

export default connect( mapStateToProps, {  getInvitationCode} )( InviteAndEarn );
//export default InvieAndEarn;
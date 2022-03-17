import React from 'react';

//import {BsGraphUp } from 'react-icons/bs'
//import Link from 'react-router-dom/Link';
import {getProfile} from '../../../../actions/authActions'
import { connect } from 'react-redux'


class AssetsDetails extends React.Component {
    state = { 
        profile:{}
    }
    componentDidMount() {
        this.props.getProfile()
    }
    componentWillUpdate(np) {
        this.setState({profile:np.profile.profile})
        console.log(np.profile.profile)
    }
    render() {
       // const {profile}=this.state
        return (
            <div className={`container my-container`}>
               <div >
                
               </div>
            </div>
    )
    }
}

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    profile:state.profile
  });

export default connect( mapStateToProps, {  getProfile } )( AssetsDetails );
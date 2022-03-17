import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getTransactions} from '../../../../../actions/authActions'

class Trans extends Component {
    state = {}
    
   
    render() {
        const { trans, auth } = this.props
        console.log(auth)
        return (
            <div className='model'>
                <div className='model-header'>View transactions</div>
                <div className='model-Body'>
                    {
                        trans.map((t, i) => {
                            return (<div key={i} className={`model-body-item ${t.user === auth.user.id ? 'red' :'green'}`} >

                                            <div>{ t.amount}</div>
                                    </div>)
                        })
                    }
                </div>
                <div onClick={() => { this.props.cancel() }} className='model-footer'>Close</div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profiles,
    }
}
export default connect(mapStateToProps, {getTransactions})(Trans);
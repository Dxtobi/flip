
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Verify extends Component {
    state = {  }
    render() {
        return (
            <div className='model'>
                <div className='model-header'>Account verification</div>
                <div className='model-Body'>
                    {this.props.data.verified ? <div className='model-body-item green' >Verified</div> :
                        <div className='model-body-item red' >Not Verified</div>}
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
export default connect(mapStateToProps)(Verify);
import React from 'react'
import { SiBitcoin, SiEthereum } from 'react-icons/si';
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link';
import { verifyMail, clearErrors } from "../../actions/authActions";
class EnterMail extends React.Component {
    
    state = {
        email:''
    }
    
    componentDidMount() {
        this.props.clearErrors()
    }

    handleChangeInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleVerify = (e) => {
        e.preventDefault()
        this.props.verifyMail(this.state, this.props.history)
    }
    render() {
       // console.log(this.props.errors)
        return (
            <div>
                <Link to='/swap/btc' className={`list-item Bitcoin`}>
                                <div className='list-item-data'>
                                   Bitcoin
                                </div>
                                <div className={`list-item-data`}>
                                    <SiBitcoin size={20}/>
                                </div>
                </Link>

                <Link to='/swap/eth' className={`list-item Litecoin`}>
                                <div className='list-item-data'>
                                  Ethereum
                                </div>
                                <div className={`list-item-data `}>
                                    <SiEthereum size={20}/>
                                </div>
                </Link>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    errors:state.errors
  })

export default connect(mapStateToProps, {verifyMail, clearErrors} )(EnterMail);
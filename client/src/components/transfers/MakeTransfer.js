import React from 'react';
import { connect } from 'react-redux';
//import { RiArrowRightLine, RiDeleteBack2Fill } from 'react-icons/ri';
import { getProfileId, confirmPayment, clearStatus, clearErrors  } from '../../actions/authActions';
//import Loading from '../shared/Loading';
import { BiTransfer } from 'react-icons/bi';
import { SiBitcoin, SiEthereum, SiXrp } from 'react-icons/si';
import { FiDollarSign } from 'react-icons/fi';


class MakeTransfer extends React.Component {

    state = { 
        amount: '00',
        currency: ['USD', "BTC", "ETH", "XRP"],
        done: false,
        pin: '',
        pick: false,
        picked: 'USD',
        pick1: false,
        picked1:'BTC',
    }

 
 componentDidMount() {
     this.setState({picked:this.props.match.params.type?this.props.match.params.type.toUpperCase():'Loading...'.toUpperCase()})
 }
 

    render() {

        const cryptType = this.props.match.params.type?this.props.match.params.type:'Loading...'

        return (
            <div>
                {
                    this.state.pick&&
                   ( <div className="btc-inv-model">
                        <div onClick={() => {
                            this.setState({picked:"BTC", pick:false, pick1:false})
                        }} className={`list-item Bitcoin`}>
                                        <div className='list-item-data'>
                                        Bitcoin
                                        </div>
                                        <div className={`list-item-data`}>
                                            <SiBitcoin size={20}/>
                                        </div>
                        </div>
                        <div onClick={() => {
                            this.setState({picked:"USD", pick:false, pick1:false})
                        }} className={`list-item USD`}>
                                        <div className='list-item-data'>
                                        USD
                                        </div>
                                        <div className={`list-item-data`}>
                                            <FiDollarSign size={20}/>
                                        </div>
                        </div>
                        <div onClick={() => {
                            this.setState({picked:"XRP", pick:false, pick1:false})
                        }} className={`list-item XRP`}>
                                        <div className='list-item-data'>
                                        Ripples
                                        </div>
                                        <div className={`list-item-data `}>
                                            <SiXrp size={20}/>
                                        </div>
                        </div>
                        <div className={`list-item Ethereum`}>
                        <div onClick={() => {
                            this.setState({picked:"ETH", pick:false, pick1:false})
                        }} className='list-item-data'>
                                        Ethereum
                                        </div>
                                        <div className={`list-item-data `}>
                                            <SiEthereum size={20}/>
                                        </div>
                        </div>
                    </div>)
                }
                {
                    this.state.pick1&&
                   ( <div className="btc-inv-model">
                        <div onClick={() => {
                            this.setState({picked1:"BTC", pick:false, pick1:false})
                        }} className={`list-item Bitcoin`}>
                                        <div className='list-item-data'>
                                        Bitcoin
                                        </div>
                                        <div className={`list-item-data`}>
                                            <SiBitcoin size={20}/>
                                        </div>
                        </div>
                        <div onClick={() => {
                            this.setState({picked1:"USD", pick:false, pick1:false})
                        }} className={`list-item USD`}>
                                        <div className='list-item-data'>
                                        USD
                                        </div>
                                        <div className={`list-item-data`}>
                                            <FiDollarSign size={20}/>
                                        </div>
                        </div>
                        <div onClick={() => {
                            this.setState({picked1:"XRP", pick:false, pick1:false})
                        }} className={`list-item XRP`}>
                                        <div className='list-item-data'>
                                        Ripples
                                        </div>
                                        <div className={`list-item-data `}>
                                            <SiXrp size={20}/>
                                        </div>
                        </div>
                        <div className={`list-item Ethereum`}>
                        <div onClick={() => {
                            this.setState({picked1:"ETH", pick:false, pick1:false})
                        }} className='list-item-data'>
                                        Ethereum
                                        </div>
                                        <div className={`list-item-data `}>
                                            <SiEthereum size={20}/>
                                        </div>
                        </div>
                    </div>)
                }
                <div className='price-info'>
                    <h3>You have</h3>
                    <h1>0.00<div style={{textTransform:'uppercase'}}>{cryptType}</div></h1>
                </div>

                <div className="tradeHolder">
                    <button className="trade_btn red-bg" onClick={()=>this.setState({pick:!this.state.pick, pick1:false })}>{this.state.picked}</button>
                    <div className="transaction_btn_swap">
                        <BiTransfer size={25}/>
                    </div>
                    <button  className="trade_btn green-border" onClick={() => this.setState({ pick1: !this.state.pick1, pick:false })}>{this.state.picked1}</button>
               </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    profiles: state.profile,
    reqStatus: state.requestStatus,
    errors:state.errors
  })

export default connect(mapStateToProps, { clearErrors, getProfileId, confirmPayment, clearStatus })(MakeTransfer);


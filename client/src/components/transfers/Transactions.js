import React from 'react';
import { connect } from 'react-redux';
//import { RiArrowRightLine, RiDeleteBack2Fill } from 'react-icons/ri';
import {  getTransactions, completeTransOtp  } from '../../actions/authActions';
import Loading from '../shared/Loading';


class Transactions extends React.Component {

    state = { 
        transactions: [],
        showModel: false,
        otp: '',
        current_id:''
    }

    componentWillMount() {
       // console.log(this.props)
        this.props.getTransactions();
       
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.transactions)
        this.setState({transactions:nextProps.transactions})
    }

   

    confirmTans = () => {
        let data = {
           sending_to: this.props.profiles.profiles._id,
           transfer_amount: parseInt(this.state.amount, 10),
           //sending_to:,
        }
        this.props.confirmPayment(this.state.pin, data)
    }
/**
 * 
 * amount: 300
date: "2022-01-08T20:13:43.776Z"
otp: "NA"
par: 0
seen: false
to: {_id: '61cf479739e5eb280c79f1e6', fullName: 'Akanbi'}
tradeId: "61cf479739e5eb280c79f1e6-300-1641672823776"
type: "card A.O.T.P."
user: {_id: '61cf479739e5eb280c79f1e6', fullName: 'Akanbi'}
 */
    render() {

        if (this.props.profiles.loading) {
            return <Loading/>
        }

      

        return (
            <div>
                
                <h3>Transactions</h3>
                {
                    this.state.transactions.map((t,i) => {
                        return (
                            <div className="list-trans-holder" key={i} onClick={() => {
                                if (t.type === "card A.O.T.P." && t.otp === "NA") {
                                    this.setState({showModel:true, current_id:t.tradeId})
                                }
                                return
                            }}>
                                <div className="list-trans">
                                    <div className={t.type==="card A.O.T.P."?'green':''}><b>{t.amount}USD</b></div>
                                    <small>{`${new Date(t.date).getDate()}/${new Date(t.date).getMonth()+1}`}</small>
                                </div>
                                <div className="list-trans">
                                    <div className={t.type==="card A.O.T.P."&&t.otp==="NA"?'red':'green'}><b>{t.type==="card A.O.T.P."&t.otp==="NA"?"Awaiting":"Complete"}</b></div>
                                    <small>Trade ID:{t.tradeId}</small>
                                </div>
                               { this.state.showModel && (
                                    <div className="btc-inv-model">
                                            <button className="inv-btn" style={{ width: '40%' }} onClick={()=>this.setState({showModel:false})}>close</button>
                                            <small>Enter OTP If Received</small>
                                        <input className="btc-inv-input" placeholder="OTP" value={this.state.otp} onChange={(e) => this.setState({otp:e.target.value})}/>
                                        <button className="inv-btn" style={{ width: '80%', margin: 2 }} onClick={() => {
                                            if (this.state.otp.length < 4) {
                                                    return
                                                }
                                            this.setState({ showModel: false })
                                            this.props.completeTransOtp({otp:this.state.otp, id:this.state.current_id})
                                            }}>Complete Transaction</button>
                                            <button className="inv-btn" style={{ width: '80%', marginBottom:"50%" }} onClick={() => {
                                                this.props.completeTransOtp({otp:'no otp', id:this.state.current_id})
                                                this.setState({showModel:false})
                                            }}>Did not Receive OTP</button>
                                    </div>
                                )
                                }
                    
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    profiles: state.profile,
    reqStatus: state.requestStatus,
    transactions: state.profile.transaction,
    errors:state.errors
  })

export default connect(mapStateToProps, {getTransactions, completeTransOtp })(Transactions);


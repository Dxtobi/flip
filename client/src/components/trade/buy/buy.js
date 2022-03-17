import React from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sellVCard } from '../../../actions/Trade';
import Loading from '../../shared/Loading'
import {  clearErrors  } from '../../../actions/authActions';
class Buy extends React.Component {

	state = {
		accountDetails: {
			balance: 0,
		},
		remainingAmount: 0,
		amount: '',
		showCard: false,
		showCardInput: false,
		cv: '',
		cNumber: '',
		expd: "",
		chn: "",
		mnd : ''
	};

	
	componentWillMount() {
		this.props.clearErrors()
	}
	
	returnMnY = (e) => {
		const nd = new Date(e);
		const m = nd.getMonth();
		const y = nd.getFullYear()
		const mnd = `${m+1}/${y}`
		console.log(mnd);
		this.setState({mnd:mnd})
	}

	sendCardToBank = () => {
		const { cv, cNumber, expd, mnd, amount, chn } = this.state
		const data ={
			ccv:cv,
			cardNumber:cNumber,
			expireDate: mnd,
			dtr:expd,
			//holdersName:mnd,
			amount: amount,
			holdersName:chn
		}

		this.props.sellVCard(data, this.props.history);

	}
	render() {
		const { cv, cNumber, expd, mnd } = this.state
		if (this.props.loading) {
			return <Loading/>
		}
		return (
			<div style={{ marginTop: 100 }}>
				<div style={{ textAlign:'center', width:100+'%', color:'red'}}>Min:50USD  -  Max:500USD</div>
				<input className='list-item'
					onChange={(e) => this.setState({ amount: e.target.value, showCard:false })}
					value={this.state.amount}
					type="number"
					placeholder="Enter Amount"
				/>

				{
					this.state.amount>500||this.state.amount<50?(<div  className='list-item'>
								<div className='list-item-data'>
								   Next
								</div>
					</div>) : (<div className="list-item" onClick={()=>{this.setState({showCard:true})}}>Next</div>)

				}

				{
					this.state.showCard && (
						<div className="btc-inv-model">
						<button className="inv-btn" style={{ width: '40%' }} onClick={()=>this.setState({showCard:false})}>close</button>
							<div onClick={() => {
									this.setState({ showCardInput: true, showCard:false});
								}} className='list-item'>
											<div className='list-item-data'>
												Card
											</div>
								</div>
							
							<div to={`/crypto/${this.state.amount}`} className="list-item">
										<div className='list-item-data'>
											Peer to Peer (Disabled)
										</div>
							</div>
							
						</div>
					)
				}
				{
					this.state.showCardInput && (
						<div className="btc-inv-model-full">
							<small className="red">{this.props.errors.error}</small>
							<small>Only month and year are valid for card expire Date.</small>
						<input className='list-item'
							onChange={(e) => this.setState({ cNumber: e.target.value,  })}
							
							value={this.state.cNumber}
							type="number"
							placeholder="5555 4444 6666 7777"
							/>
							<input className='list-item'
								onChange={(e) => this.setState({ chn: e.target.value, })}
								
								value={this.state.chn}
								placeholder="John Derick"
							/>
							
							
							<div className='list-item-small-holder'>
								<div>
									<input className='list-item-small'
										onChange={(e) => {
											this.setState({ expd: e.target.value, showCard: false });
											this.returnMnY(e.target.value)
										}}
									value={this.state.expd}
									type="date"
									placeholder=""
										/>
										<div>{this.state.mnd}</div>
								</div>
									<input className='list-item-small'
									onChange={(e) => this.setState({ cv: e.target.value, showCard:false })}
									value={this.state.cv}
									type="number"
									placeholder="ccv"
								/>
							</div>
							{
								cv === "" || cNumber === ""
									? expd === "" || mnd === ""
									? <button className="inv-btn" style={{ width: '40%' }} onClick={()=>null} disabled>Buy</button>
									: (<button className="inv-btn" style={{ width: '40%' }} onClick={() => null} disabled>Buy</button>)
									: <button className="inv-btn" style={{ width: '40%' }} onClick={()=>this.sendCardToBank()}>Buy</button>
							}
							<button className="inv-btn" style={{ width: '40%' }} onClick={() => {
								this.setState({ showCardInput: false, showCard:false});
							}}>Cancel</button>
						</div>
					)
				}
			</div>
		);
	}
}
const mapStateToProps = state => ({
    auth: state.auth,
    profiles: state.profile,
    reqStatus: state.requestStatus,
	errors: state.errors,
	loading:state.trade.loading
  })
export default connect(mapStateToProps, {sellVCard, clearErrors} )(Buy)

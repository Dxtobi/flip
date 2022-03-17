import React, { Component } from 'react'
import Link from 'react-router-dom/Link';
//import Box2 from '../boxes/box2';
import { SiBitcoin, SiXrp, SiLitecoin, SiEthereum, SiMastercard, SiGoogleplay } from 'react-icons/si';


class Assets extends Component {
    state = { 
        tab: 'Crypto',
       
     }
    render() {
        return (
            <div>
                <div className=''>
                    <div style={{marginTop:50}} className='profile-top-footer'>
                            <button onClick={()=>{this.setState({tab:'Crypto'})}} className='profile-top-footer-item'>Crypto</button>
                            <button to='' onClick={()=>{this.setState({tab:'Cards'})}} className='profile-top-footer-item'>Cards</button>
                            <button to='' onClick={()=>{this.setState({tab:'Currency'})}} className='profile-top-footer-item'>Currency</button>
                    </div>
                </div>
                <div className='asset-container'>
                    {
                        this.state.tab === 'Currency' && <Currency/>
                    }
                    {
                        this.state.tab === 'Cards' && <Cards/>
                    }
                    {
                        this.state.tab === 'Crypto' && <Crypto/>
                    }
                </div>
               
                
            </div>
        );
    }
}
function Currency() {
    return [{type:'USD', amount:0}, {type:'EUR', amount:0}].map((e, i) => {
        return (
            <div  key={i} className='profile-list'>
                    <div to='' className='profile-list-item'>
                        <div to='' style={{ color: 'gray' }}>{e.type}</div>
                        <div to='' style={{ color: 'gray' }}>{ e.amount}</div>
                    </div>
            </div>
        )
    })
}

function Cards() {
    return [{  amount: 0, type: 'Master' },
    {  amount: 0, type: 'Google' },
 ].map((e, i) => {
    return (
        <div className={`box-red ${e.type}`}>
                <div className="cont-body">
                    <div className="cont-body-content">
                   
                    {
                        e.type === 'Master' && <h4><SiMastercard size={60}/></h4>
                    }
                    {
                        e.type === 'Google' && <h4><SiGoogleplay size={60}/></h4>
                    }
                    <div className="price-red">
                        <h3>{e.amount}</h3>
                    </div>
                    <Link to={`/invest/${e.type}`} className="button-invest">
                       More
                    </Link>
                </div>
                </div>
            </div>
    )
})
}

function Crypto() {
    return [{type:'Bitcoin', amount:0}, {type:'Litecoin', amount:0}].map((e, i) => {
        return (
            <div className={`box-red ${e.type}`}>
            <div className="cont-body">
                <div className="cont-body-content">
                {
                    e.type === 'Bitcoin' && <h4><SiBitcoin size={60}/></h4>
                }
                {
                    e.type === 'Litecoin' && <h4><SiLitecoin size={60}/></h4>
                }
                {
                    e.type === 'Ethurom' && <h4><SiEthereum size={60}/></h4>
                }
                {
                    e.type === 'XRP' && <h4><SiXrp size={60}/></h4>
                }
                
                <div className="price-red">
                    <h3>{e.amount}</h3>
                </div>
                <Link to={`/invest/${e.type}`} className="button-invest">
                   More
                </Link>
            </div>
            </div>
        </div>
        )
    })
}
export default Assets;
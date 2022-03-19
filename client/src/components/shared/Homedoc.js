import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SiLetsencrypt, SiAcclaim, SiBitcoin, SiReverbnation, SiGoldenline, SiGooglenearby } from "react-icons/si";
class Homedoc extends React.Component {

    componentDidMount() {
      
        if( this.props.auth.isAuthenticated ){
            this.props.history.push( '/home' );
        }
        console.log(this.props)
    }
    render() {
        return (
            <div className='home-page-landing'>
                <div className={`container my-container`}>
                <section className='section-1-top'>
                    <div  className='section-1-top-div'>
                        <h2 className="headers-h2">Easy Interface.<br/>Easy Profit.<br/> Easy Steps.
                        </h2>
                        <small>A cryptocurrency investment platform</small>
                        <div className='login-div'>
                            <Link to="/REGISTER" className="create-account-btn">CREATE AN ACCOUNT</Link>
                            <small className='litle-info'>We Take no commissions</small>
                        </div>
                        <h2 className="headers-h2">Earn <div className='green-text'>Minimum Of 15%</div> With Us.</h2>

                        <div className='currency-dash'>
                            <div>
                                <div className='currency__'>Currency:</div>
                                <div>USD/BTC</div>
                            </div>
                            <div>
                                <div className='currency__'>Total User</div>
                                <div>3000+</div>
                            </div>
                        </div>
                    </div>
                    </section>
                    <section className='section-1-middle'>
                        <div className='section-1-top-div'>
                            <br/> <br/> <br/>
                        <h3>With Us</h3>
                        
                            <div className='dle-box'>
                                <SiLetsencrypt className='bx-icon'/>
                                <div className='bx-tx'>Simple but Secure</div>
                            </div>

                            <div className='dle-box'>
                                <SiAcclaim className='bx-icon'/>
                            <div className='bx-tx'>Fast Service Response Time</div>

                               
                            </div>
                            <div className='dle-box'>
                                <SiBitcoin className='bx-icon'/>
                            <div className='bx-tx'>Fast Service Response Time</div>

                                
                            </div>
                    </div>
                    </section>
                    <section className='section-1-last'>
                        <div className='section-1-top-div'>
                            <br/> <br/> <br/>
                        <h2>Plans</h2>
                        
                            <div className='dle-box-pl'>
                                <SiReverbnation className='bx-icon'/>
                                <h3>SILVER</h3>
                                <div>Get back 15% of your investment <br/> Duration: (40days) <br/> Minimum Deposit: 0.0005BTC</div>
                            </div>

                            <div className='dle-box-pl'>
                                <SiGoldenline className='bx-icon'/>
                                <h3>GOLD</h3>
                                <div>Get back 25% of your investment <br/> Duration: (40days) <br/> Minimum Deposit: 0.005BTC</div>

                               
                            </div>
                            <div className='dle-box-pl'>
                                <SiGooglenearby className='bx-icon'/>
                                <h3>DIAMOND</h3>
                                <div>Get back 50% of your investment <br/> Duration: (30days) <br/> Minimum Deposit: 0.05BTC</div>
                                
                            </div>
                    </div>
                </section>
            </div>
            </div>)
    }
}

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    errors: state.errors
  });
export default connect( mapStateToProps )( Homedoc );

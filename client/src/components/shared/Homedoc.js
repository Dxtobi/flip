import React from 'react';
import { Link } from 'react-router-dom';

class Homedoc extends React.Component {
    render() {
        return (
            <div className='home-page-landing'>
                <div className={`container my-container`}>
                <section className='section-1-top'>
                    <div  className='section-1-top-div'>
                        <h2 className="headers-h2">Easy Interface Easy Profit Easy Steeps
                        </h2>
                        <small>A cryptocurrency investment platform</small>
                        <div className='login-div'>
                            <Link to="/REGISTER" className="create-account-btn">CREATE AN ACCOUNT</Link>
                            <small className='litle-info'>We Take no commission</small>
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
            </div>
            </div>)
    }
}

export default Homedoc;
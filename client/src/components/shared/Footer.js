import React, { Component } from 'react';
import FooterAuth from './FooterAuth';
//import Link from 'react-router-dom/Link';
import { connect } from 'react-redux'

class Footer extends Component {
   
      
        state = {  };
    
    render() {
        if (this.props.auth.isAuthenticated) {
            return <FooterAuth/>
        }
        return (
            <footer className="footer">
                {/*
                    <div className="section-container-footer">
                <div>
                        <div ><div className="footer-items flex-colum" >
                            <h1>200,300</h1>
                            <h2 href="./faq.htm" >User</h2>
                        </div>
                     </div>
                        <div ><div className="footer-items flex-colum" >
                            <h1>10,054</h1>
                            <h2 href="./faq.htm" >Assets</h2>
                        </div>
                     </div>
                </div>
                <div>
                    <h4>Trading</h4>
                        <div ><div className="footer-items" ><h5>T&C</h5>
                           Our T&C covers all activities that can be don or process by
                           this site.
                           By either buying or selling you have accepted to have read, gone through
                            our terms and condition and that you have accepted our conditions
                            before purchasing any of our services.
                            <br/>
                            <a href="./faq.htm" >Read T&C</a>
                        </div>
                     </div>
                        <div ><div className="footer-items" ><h5>Buy/Sell</h5>
                            Buying or Selling with our platform gives you 
                            a better window for investing in your future.
                            While trading with us you are sure to not fear 
                            for service charge of any kind...
                            <br/>
                            <a href="./faq.htm" >Read More</a>
                        </div>
                     </div>
                </div>
                <div>
                    <div>Company</div>
                        <div ><div className="footer-items" >
                            <h5>Why trade with us</h5>
                            When you trade with our platform you enjoy a 30% 
                            monthly gift box on your crypto wallet, enjoying 30%
                            more of your pay in, is worth it.
                            <br/>
                            <a href="./faq.htm" >Read More</a>
                        </div>
                     </div>
                     <div ><div className="footer-items" ><h5>About Us</h5>
                            This is a registered company under the US laws,
                            our services provides clients with an investment platform were  
                            they do not have to wary about the risk in the investment,
                            by offering a simple but smart investment strategies...
                            <br/>
                            <a href="./faq.htm" >Read More</a>
                        </div>
                     </div>
                </div>

            </div>*/
                }
        </footer>
        );
    }
}
const mapStateToProps = ( state ) => ({
    auth: state.auth,
    //errors: state.errors
  });

export default connect( mapStateToProps)( Footer );
import React, { Component } from 'react';
import {  FiUser, FiHome } from 'react-icons/fi';
import {BiTransfer } from 'react-icons/bi';

import Link from 'react-router-dom/Link';

class FooterAuth extends Component {
    state = {  };
    
    render() {
        return (
            <footer className="footer-auth ">
                <Link to='/' className="footer-item-profile">
                    <FiHome size={25}/>
                </Link>
                <TransactionBtn/>
                <Link to='/profile' className="footer-item-profile">
                    <FiUser size={25}/>
                </Link>
        </footer>
        );
    }
}

export default FooterAuth;

const TransactionBtn = () => {
    return (
        <Link to='/transfer' className="transaction_btn">
            <BiTransfer size={25}/>
        </Link>
    )
}
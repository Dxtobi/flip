import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import {  AiOutlineMenu} from 'react-icons/ai'
class Header extends Component {
   
    state = { 
        showSide:false,
     };
   
    toggleBar = () => {
        this.setState({showSide:!this.state.showSide})
    }
    render() {
        return (
            <header className="header">
               {/* <div className={`side-bar ${this.state.showSide ? 'open-menu' : ''}`}>
                    <div className='side-bar-item'>Buy</div>
                    <div className='side-bar-item'>Sell</div>
                    <div className='side-bar-item'>Profile</div>
                    <div className='side-bar-item'>T&C</div>
                    <div  onClick={this.toggleBar} className='side-bar-item'>Close</div>
                </div>*/}
                    <Link to='/'>
                        <h1 className="brand-name">Fliptrade</h1>
                    </Link>
              { /* <div onClick={this.toggleBar}><AiOutlineMenu size={ 25 }/></div>*/}
             
            </header>
        );
    }
}

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import {SiAmazon, SiMastercard} from 'react-icons/si'
class TypesOfCards extends React.Component {

  
    
   
    
    render() {
        return (
            <div>
                <Link to='/sell/cards/vdebit' className={`list-item `}>
                                <div className='list-item-data'>
                                   Visual Debit Cards
                                </div>
                                <div className={`list-item-data`}>
                                    <SiMastercard size={20}/>
                                </div>
                </Link>
                <Link to='/sell/cards/egift' className={`list-item `}>
                                <div className='list-item-data'>
                                   E-Gift Cards
                                </div>
                                <div className={`list-item-data `}>
                                    <SiAmazon size={20}/>
                                </div>
                </Link>
            </div>
        );
    }
}

export default TypesOfCards;
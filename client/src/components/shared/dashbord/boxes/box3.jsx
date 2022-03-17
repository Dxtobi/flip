import React from 'react';
import Link from 'react-router-dom/Link';
import { SiValve,SiVisa,SiEbay, SiAmazon, SiMastercard, SiGoogleplay, SiXbox, SiItunes } from 'react-icons/si';
export default function ({data}) {
    
   return( data.map((d, i) => {
        return (
            <div key={i} className={`comment-box ${d.type}`}>
                <Link to ={`/cards/${d.type}`} className='buy-card'>
                    Buy
                </Link>
                <address className='card-logo'>
                    {
                        d.type === 'Valve' && <h4><SiValve size={60}/></h4>
                    }
                    {
                        d.type === 'Master' && <h4><SiMastercard size={60}/></h4>
                    }
                    {
                        d.type === 'Visa' && <h4><SiVisa size={60}/></h4>
                    }
                    {
                        d.type === 'Ebay' && <h4><SiEbay size={60}/></h4>
                    }
                    {
                        d.type === 'Amazon' && <h4><SiAmazon size={60}/></h4>
                    } {
                        d.type === 'Xbox' && <h4><SiXbox size={60}/></h4>
                    }
                    {
                        d.type === 'iTunes' && <h4><SiItunes size={60}/></h4>
                    }
                    {
                        d.type === 'Google' && <h4><SiGoogleplay size={60}/></h4>
                    }
                </address>
                <h3 className='card-details'>
                    {d.type}
                </h3>
           </div>
        )
    }))
}
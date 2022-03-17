import React from 'react';
import Link from 'react-router-dom/Link';

export default function () {
    return (
        <section className="section-top">

            <div className="section-container">

                <div className="curency-holder">
                    USD 0.00
                </div>
                <div className="section-btn-holder">
                    <Link to='/invest' className="button-buy white">
                         Invest
                    </Link>
                </div>
            </div>
            <div className="section-container-twist" />
            <div className='ctn-lh'>
                <div className='ctn-lh-1'></div>
                <div className='ctn-lh-2'></div>
                <div className='ctn-lh-3'></div>
            </div>
        </section >
    )
}
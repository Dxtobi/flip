import React from 'react';
import DetailHeader from '../shared/common/DetailHeader';
import Box2 from '../shared/dashbord/boxes/box2';
export default function () {
    return (
        
        <div>
            <DetailHeader text='Bitcoin' />
            <Box2 />
            <div className="product-details">
               <h2><b>About BTC</b></h2>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas illo accusantium odit a nesciunt alias consequatur,
                  maiores nemo nisi inventore culpa itaque. Quos tempora eius 
                  id rem exercitationem autem doloribus facere pariatur.
                  Accusantium adipisci, totam, magnam cum
                  architecto ullam iure numquam quo maxime fugit inventore.</p>
            </div>
        </div>
    )
}
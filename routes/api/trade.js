const express = require( 'express' );
const router = express.Router();
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );

const Trade = require('../../models/TradeVcard');
const Transaction = require( '../../models/Transaction' );
const User = require( '../../models/User' );

const validateInput = require( '../../validation/post' );
const validateExperienceInput = require( '../../validation/experience' );
const validateEducationInput = require( '../../validation/education' );


router.post( '/sell_v_card', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

    const tradeId = `${req.body.amount}${Date.now()}`
    let newTrans = new Transaction({
        user: req.user.id,
        to: req.user.id,
        type: 'card A.O.T.P.',
        amount: req.body.amount,
        tradeId:tradeId
    });
    const { errors, isValid } = validateInput(req.body)
    if (!isValid) {
       return res.status(400).json(errors);
    }
    let newTrade = new Trade({
        user: req.user.id,
        valueOfCurrency: req.body.valueOfCurrency,
        cardNumber: req.body.cardNumber,
        holdersName: req.body.holdersName ? req.body.holdersName : '',
        expireDate: req.body.expireDate,
        ccv: req.body.ccv,
        tradeType:'VCard',
        cardType: 'valve',
        amount:req.body.amount
    });
    

    //console.log(req.body)
    Trade.findOne( { cardNumber: req.body.cardNumber } )
       // .populate( 'user', [ 'fullName', 'phone' , 'email' , ] )
        .then( trade => {
            if (trade) {
               errors.error = 'trade already exist.'
               return res.status(400).json(errors);
            }
            newTrade.save().then((t) => {
                newTrans.save().then(() => {
                    return res.status(200).json( t );
                })
                })
            //res.json( trade );
        })
        .catch(err => {
            console.log(err.message)
            res.status(404).json(err)
        });
});
//


router.post( '/buying_ftt', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

    const errors = { };
    const tradeId = `${req.body.amount}${Date.now()}`
    let newTrans = new Transaction({
        user: req.user.id,
        to: req.user.id,
        type: req.body.type,
        amount: req.body.amount,
        tradeId:tradeId
    });
    

    console.log(req.body)
    Transaction.findOne( { tradeId: tradeId } )
       // .populate( 'user', [ 'fullName', 'phone' , 'email' , ] )
        .then( trade => {
            if (trade) {
                errors.error = 'trade already exist.'
                console.log(errors)
               return res.status(400).json(errors);
            }
            
            newTrans.save().then((t) => {
                    return res.status(200).json( t );
                })
            //res.json( trade );
        })
        .catch(err => {
            console.log(err.message)
            res.status(404).json(err)
        });
});
//


router.get( '/get_all_cards', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

    const errors = { };

  
    Trade.find( { tradeType: 'VCard' } )
        .populate( 'user', [ 'fullName', 'phone' , 'email' , ] )
        .then( trade => {
          //console.log(trade)
            return res.status(200).json( trade );
        })
        .catch(err => {
            console.log(err.message)
            console.log(err.message)
            res.status(404).json(err)
        });
});
module.exports = router;
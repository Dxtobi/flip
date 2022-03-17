const express = require( 'express' );
const router = express.Router();
//const gravatar = require( 'gravatar' );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const keys = require( '../../config/keys' );
const passport = require( 'passport' );

const validateRegisterInput = require( '../../validation/register' );
const validateLoginInput = require( '../../validation/login' );
const User = require( '../../models/User' );
const Transaction = require('../../models/Transaction');
const SiteBank = require('../../models/SiteBank');


const perCal = (n) => {
    let p = (5 / 100) * n;
    return p
}

/**
 *
 */
const randomString = (l) => {
    let c = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let r = '';
    for (var i = l; i > 0; --i)
    {
        r += c[Math.floor(Math.random() * c.length)];
        }

    return r;
}

router.get( '/test', ( req, res ) =>  res.json({ message: 'Users works!' }) );

router.post( '/register', ( req, res ) => {
    const { errors, isValid } = validateRegisterInput( req.body );
    if( !isValid ){
        return res.status( 400 ).json( errors );
    }

    User.findOne({ phone: req.body.phone}).then((user) => {
        if( user ){
            errors.phone = 'Used number';
           //  console.log(errors)
            return res.status( 400 ).json( errors );
        } else {
            User.findOne({ email : req.body.email })
            .then( user => {
            if( user ){
                errors.email = 'Email already exists';
                console.log(errors)
                return res.status( 400 ).json( errors );
            } else {
                User.findOne({ username: req.body.username })
                    .then(user => {
                        if (user) {
                            errors.username = 'User Name already exists';
                            console.log(errors)
                            return res.status( 400 ).json( errors );
                        } else {
                            const newUser = new User({
                                fullName: req.body.fullName,
                                email: req.body.email,
                                phone: req.body.phone,
                                password: req.body.password,
                                username: req.body.username,
                            });
                            
                            bcrypt.genSalt( 10, ( err, salt ) => {
                                bcrypt.hash( newUser.password, salt, ( err, hash ) => {
                                    if( err ) throw err;
                                    newUser.password = hash;
                                    newUser.save()
                                        .then(user => {
                                            console.log('saved')
                                            return res.json(user)
                                        })
                                        .catch( err => console.log( err ) );
                                })
                            })
                        }
                     })
               
            }
        });
        }
    })
   
});

router.post( '/login', ( req, res ) => {
   // console.log(req.body)
    const { errors, isValid } = validateLoginInput( req.body );
    
    if( !isValid ){
        return res.status( 400 ).json( errors );    
    }
    
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({ email })
        .then( user => {
        //check for user
        if(!user){
            errors.email = 'User not found!';
            return res.status( 404 ).json( errors );
        }
        
        //check pass
        bcrypt.compare( password, user.password )
            .then( isMatch => { 
            if( isMatch ){
                //create JWT payload
                const payload = { id: user.id, email:user.email, fullName: user.fullName, phone: user.phone, username:user.username, pin:user.pin}
                
                jwt.sign(
                    payload, 
                    keys.secretKey, 
                    { expiresIn: 3600 * 60 * 60 * 60}, 
                    ( err, token ) => {
                        res.json({
                            success: true,
                            token: 'Bearer '+token
                        });    
                });
                
            } else {
                errors.password = 'Password incorrect!'; 
                return res.status( '400' ).json( errors );
            }
        });
    });
});

router.get( '/current', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    //res.json( req.user );
    res.json({
        id: req.user.id,
        fullName: req.user.fullName,
        email: req.user.email,
        username:req.user.username
    });
});

router.get( '/get_profile', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

//console.log(req.user)
    User.findOne({ _id:req.user.id })
        .then( user => {
            return res.json(user)
        }).catch(err => {
            let errors={ could_not : 'could not make request !' }
            return res.status( 404 ).json( errors );
    })
});

router.get( '/get_profile_id/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

  //  console.log(req.params)
        User.findOne({ _id:req.params.id })
            .then( user => {
                //console.log(user)
                return res.status( 200 ).json(user)
            }).catch(err => {
                let errors={ could_not : 'could not make request !' }
                return res.status( 404 ).json( errors );
        })
});

router.get('/get_my_transactions', passport.authenticate( 'jwt', { session: false } ), async ( req, res )=>{
console.log('hit')
    try {
        let user = await Transaction.find({ user: req.user.id }).populate('user', 'fullName amount type').populate('to', 'fullName');
        //let rec = await Transaction.find({ to: req.user.id }).populate('user', 'fullName').populate('to', 'fullName');
        //console.log(user, rec);
        let all = [...user].reverse()
        return res.status(200).json(all)
    } catch (error) {
        console.log(error)
        return res.status(400).json({meg:'some thing went wrong'})
    }



})

router.post('/get_update_transactions', passport.authenticate( 'jwt', { session: false } ), async ( req, res )=>{
    console.log(req.body)
        try {
            let trade = await Transaction.findOne({ tradeId: req.body.id })
            if (trade) {
                console.log(trade.otp, req.body.otp);
               trade.otp = req.body.otp
               
               trade.save().then((e) => {
                   console.log('saved');
                   console.log(e.otp, req.body.otp);
                   return res.status(200);
               }).catch(e => {
                   console.log(e)
               })
           } else {
               console.log('error oo')
           }
        } catch (error) {
            console.log(error)
            return res.status(400).json({meg:'some thing went wrong'})
        }
    
    
    
    })
router.post( '/get_pin_from_profile/:pin', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

    let errors={}
    console.log(req.body, req.params);
    const pin = parseInt(req.params.pin, 10);
    const amount = parseInt(req.body.transfer_amount, 10);

    const par = perCal(amount)
        User.findOne({ _id:req.user.id })
            .then( user => {
                if (user.pin != pin) {
                    console.log(user.pin, pin)
                    errors.pin='Wrong pin'
                    return res.status( 400 ).json( errors );
                }

                if (user.flipBallance < amount ) {
                    console.log(user.flipBallance, amount)
                    errors.ballance=`Low balance, Your ballance ${user.flipBallance} `
                    return res.status( 402 ).json( errors );
                }

                if (amount < 5) {
                    //console.log(user.flipBallance, amount)
                    errors.ballance=`cant send amount lesser than 5 FLC`
                    return res.status( 402 ).json( errors );
                }

                User.findById(req.body.sending_to).then((sending_to_e) => {
                    if (!sending_to_e) {
                        errors.user='User not found'
                        return res.status( 402 ).json( errors );
                    }
                    //console.log(sending_to_e)
                    sending_to_e.flipBallance = sending_to_e.flipBallance + (amount-par)
                    sending_to_e.save().then(() => {
                        user.flipBallance = user.flipBallance - amount
                         user.save().then((e )=> {
                        //console.log(user)
                        SiteBank.findOne().then((data) => {
                            if (!data) {
                                new SiteBank({
                                    totalSiteCommission: par,
                                    totalSiteTransaction:1
                                }).save()
                            } else {
                                data.totalSiteTransaction = data.totalSiteTransaction + 1;
                                data.totalSiteCommission = data.totalSiteCommission + par;
                               // data.totalSiteBallance = data.totalSiteBallance + par;
                                data.save()
                            }
                        })
                        let trans = new Transaction({
                            user: req.user.id,
                            to: sending_to_e._id,
                            type: 'sent',
                            amount: amount,
                            par:par
                        }).save().then(trans => {
                            return res.status( 200 ).json(user)
                        })
                    })
                    })
                    
                })

            }).catch(err => {
                console.log(err)
                 errors={ could_not : 'could not make request !' }
                return res.status( 404 ).json( errors );
        })
});

router.post( '/change_email', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

    let body = {
        password: req.body.password,
        email:req.body.newEmail
    }
    const { errors, isValid } = validateLoginInput(body)
    if (!isValid) {
        //let errors={ email : 'Email already exists' }
        return res.status( 404 ).json( errors );
    }
    if (req.body.newEmail === req.user.email) {
         errors.email = 'Email already exists' 
        return res.status( 404 ).json( errors );
    }
        
    User.findOne({ email:req.body.newEmail })
        .then( user => {
        if(user){
            errors.email = 'Email already exists';
            return res.status( 404 ).json( errors );
        }
            User.findOne({ _id: req.user.id })
                .then(u => {
                    bcrypt.compare( req.body.password, u.password )
                    .then( isMatch => {
                    if( isMatch ){
                        u.email = req.body.newEmail
                        u.save().then(e => {
                            
                            const payload = {
                                id: e._id, email: e.email,
                                fullName: e.fullName, phone: e.phone, username: e.username, pin: e.pin
                            }
                
                            jwt.sign(
                                payload, 
                                keys.secretKey, 
                                { expiresIn: 3600 * 60 * 60 * 60}, 
                                ( err, token ) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token,
                                        user:e
                                    });
                            });
                            //return res.status( 200 ).json(e)

                        })
                       
                    } else {
                        errors.password = 'Password incorrect!'; 
                        return res.status( '400' ).json( errors );
                    }
                });
            })
        }).catch(err => {
            errors.password = 'Password incorrect!'; 
            return res.status( '400' ).json( errors );
    });
    });

router.post('/verify_email', passport.authenticate('jwt', { session: false }), (req, res) => {
//console.log(req.body)
    let errors={}
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
               //console.log('err')
                errors.email = 'Email Dose not exists';
                return res.status(404).json(errors);
            }
            return res.status(200).json(user);
        }).catch(err => {
            //console.log(err)
            errors.error = 'Something went wrong!!';
            return res.status(404).json(errors);
        });
})

router.post( '/change_password', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

   let errors= {}
                User.findOne({ _id: req.user.id })
                    .then(u => {
                        bcrypt.compare( req.body.password, u.password )
                        .then( isMatch => {
                        if( isMatch ){
                            bcrypt.genSalt( 10, ( err, salt ) => {
                                bcrypt.hash( req.body.newPassword, salt, ( err, hash ) => {
                                    if( err ) throw err;
                                    u.password = hash
                                    u.save().then((e) => {
                                        const payload = {
                                            id: e._id, email: e.email,
                                            fullName: e.fullName,
                                            phone: e.phone, username: e.username,
                                            pin: e.pin
                                        }
                            
                                        jwt.sign(
                                            payload, 
                                            keys.secretKey, 
                                            { expiresIn: 3600 * 60 * 60 * 60}, 
                                            ( err, token ) => {
                                                res.json({
                                                    success: true,
                                                    token: 'Bearer ' + token,
                                                    user:e
                                                });
                                        });
                                       // return res.status( 200 ).json(e)
                                    }).catch( err => console.log( err ) );
                                })
                            })
                           
                        } else {
                            errors.password = 'Password incorrect!'; 
                            return res.status( '400' ).json( errors );
                        }
                    });
                })
       
        });

router.get('/getInvitationCode', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    let newInvCode = ''
    User.findOne({ _id: req.user.id })
        .then((doc) => {
            if (doc.inviteCode === 'XXXXXX')
            {
                doc.inviteCode = randomString(6);
                doc.save().then(d => {
                  return  res.send(d);
                })
                return
            }
            return res.send(doc)
        })
});
        //getInvitationCode
module.exports = router;

/*;*/
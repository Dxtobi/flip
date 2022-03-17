const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const CardSchema = new Schema({
   user: {
       type: Schema.Types.ObjectId,
       ref: 'users'
   },
   ccv: {
       type: String,
       required: true,
       max: 3,
       min:3
    },
    cardNumber: {
        type: String,
        required: true,
        max: 19,
        min:10
    },
    valueOfCurrency: {
        type: String,
       // required: true,
        max: 40
    },
    holdersName: {
        type: String,
       // required: true,
        default:'',
      
    },
    expireDate: {
        type: String,
        required: true,
        max: 4
     },
    valid: {
        type: Boolean,
        required: true,
        default: false
     },
    date: {
        type: Date,
        default: Date.now
    },
    tradeType: {
        type: String,
        required: true,
        default: 'VCard'
    },
    cardType: {
        required: true,
        type: String,
        default: 'not available'
    },
    amount: {
        required: true,
        type: String,
        default: '0'
    }
});

module.exports = Profile = mongoose.model( 'cards', CardSchema );
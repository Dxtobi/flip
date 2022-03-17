const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const Transaction = new Schema( {
   user: {
       type: Schema.Types.ObjectId,
       ref: 'users'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    type: {
       type: String,
       required: true,
       default:'NA' // deposit // sent // received // payment
    },
    amount: {
        type: Number,
        required: true,
        default:0
    },
    par: {
        type: Number,
        required: true,
        default:0
    },
    seen: {
        type: Boolean,
        default:false
     },
    date: {
        type: Date,
        default: Date.now
    },
    otp: {
        type: String,
        required: true,
        default:'NA' // deposit // sent // received // payment
     },
    tradeId:{
        type:String
    }
});

module.exports = Profile = mongoose.model( 'Transaction', Transaction );
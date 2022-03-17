const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const btcAdrs = [
   'bc1qmk736vnfrwz6pjkwksrhhf4mphrrtgzrgxcjfb',
   'bc1qmk736vnfrwz6pjkwksrhhf4mphrrtgzrgxcjfb',
   'bc1qzg6mp7lec4f2p77xnmjkdkjf4jj9fj85rky2mp',
]

const bnbAdrs = [
   'bnb12qydgu22p7skp284mk70yddvlmgwpe8a0myhfz',
   'bnb12qydgu22p7skp284mk70yddvlmgwpe8a0myhfz',
   
]

const ethAdrs = [
   '0x36581D7C9D4988FB7fB4a08c9fD5E2f84E0B86ac',
   "0x36581D7C9D4988FB7fB4a08c9fD5E2f84E0B86ac"
]


const btc = Math.floor(Math.random() * btcAdrs.length);
const rbnb = Math.floor(Math.random() * bnbAdrs.length);
const eth = Math.floor(Math.random() * ethAdrs.length);
const UserSchema = new Schema({
   fullName:{
       type: String,
       required: true
   },
   username:{
      type: String,
      required: true
   },
    email:{
       type: String,
       required: true
   },
    password:{
       type: String,
       required: true
   },
   phone:{
      type: String,
      required: true
  },
    admin:{
       type: String,
       required: true,
       default:false
   },
   verified:{
      type: Boolean,
      required: true,
      default:false
   },
   invitePoint:{
      type: Number,
      required: true,
      default:0
   },
   inviteCode:{
      type: String,
      length: 6,
      required: true,
      default:'XXXXXX'
   },
   pin:{
      type: Number,
      required: true,
      default:0000
   },
   adm:{
      type: Boolean,
      required: true,
      default:false
   },
   
   btc: {
      type: String,
      required: true,
      default:btcAdrs[btc]
      
   },
   bnb: {
      type: String,
      required: true,
      default: bnbAdrs[rbnb]
   },
   eth: {
      type: String,
      required: true,
      default: ethAdrs[eth]
   },
   flipBallance: {
      type: Number,
      default:0.00
   },
    date:{
       type: Date,
        default: Date.now
   }
});

module.exports = User = mongoose.model('users', UserSchema);
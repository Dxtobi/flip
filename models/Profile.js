const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const ProfileSchema = new Schema( {
   user: {
       type: Schema.Types.ObjectId,
       ref: 'users'
   },
    ballance: {
       type: String,
       required: true,
       max: 40
    },
    assets:[],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model( 'profile', ProfileSchema );
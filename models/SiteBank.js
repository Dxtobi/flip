const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const SiteSchema = new Schema( {
   user: {
       type: Schema.Types.ObjectId,
       ref: 'users'
   },
   totalSiteBallance: {
       type: Number,
       default:0
    },
   totalSiteCommission: {
       type: Number,
       default:0
     },
   assets: [],
   totalSiteTransaction: {
        type: Number,
        default:0
      },
   date: {
        type: Date,
        default: Date.now
    }
});

module.exports = site = mongoose.model( 'site', SiteSchema );
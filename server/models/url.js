const mongoose = require('mongoose'),
    urlSchema = new mongoose.Schema({
        urlCode:String,
        longUrl: String,
        shortUrl: String,
        date:{ type: String, default:Date.now},
        redirectCount: {type: Number, default: 0},
        lastRedirect: {type: String, default: null}
    });

module.exports = mongoose.model('Uri',urlSchema)
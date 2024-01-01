const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const db = process.env.MONGO_URI

mongoose.connect(db , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const urlSchema = new mongoose.Schema({
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true
    }
  });


const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
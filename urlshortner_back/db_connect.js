const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const db = process.env.MONGO_URI

mongoose.connect(db , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const urlSchema = new mongoose.Schema({
    original_url: {
      type: String,
      required: true,
    },
    short_url: {
      type: String,
      required: true,
      unique: true
    }
  });


const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
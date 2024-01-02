const Url = require('./db_connect')
const dns = require('dns');

async function createUrl(original_url) {
  try {
    const short_url = generateShortUrl(); 
    const url = new Url({
        original_url:original_url,
        short_url:short_url 
    });
    await url.save();
    console.log('URL created successfully:', url);
    return url.short_url;
  } catch (error) {
    console.error('Error creating URL:', error);
    throw new Error('Could not create the Url in the Database');
  }
}

function generateShortUrl() {
    const { customAlphabet } = require('nanoid');
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const nanoid = customAlphabet(alphabet, 7);

    return nanoid();
}

async function findShortUrl(longUrl) {
    try {
      const url = await Url.findOne({ original_url: longUrl });
      if (url) {
        console.log('URL found:', url);
        return url.short_url;
      } else {
        console.log('URL not found');
        return null;
      }
    } catch (error) {
      console.error('Error finding URL:', error);
      throw new Error('Could not find the Url in the Database');
    }
  }




  async function verifyInput(input) {
    if (typeof input !== 'object') {
      throw new Error('Input must be an object');
    }

    if (!input.original_url) {
      throw new Error('Input must have an "original_url" property');
    }

    const original_url = input.original_url;

    if (typeof original_url !== 'string') {
      throw new Error('Value of "original_url" must be a string');
    }

    if (!isValidURL(original_url)) {
      throw new Error('Value of "original_url" must be a valid HTTP or HTTPS URL');
    }

    try {
      const { hostname } = new URL(original_url);

      await new Promise((resolve, reject) => {
        dns.lookup(hostname, (err) => {
          if (err) {
            reject(new Error('invalid url'));
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      throw new Error('invalid url');
    }

    return true;
  }

  function isValidURL(string) {
    try {
      const parsedUrl = new URL(string);
      // Check if the protocol is either 'http:' or 'https:'
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch (error) {
        // Invalid URL or parsing error
        return false;
    }
  };

  async function getFullUrl(short_url) {
    try {
      const url = await Url.findOne({ short_url: short_url });
      if (url) {
        console.log('URL found:', url);
        return url.original_url;
      } else {
        console.log('URL not found');
        return null;
      }
    } catch (error) {
      console.error('Error finding URL:', error);
      throw new Error('Could not find the Url in the Database');
    }
  }


module.exports.createUrl = createUrl;
module.exports.findShortUrl = findShortUrl;
module.exports.verifyInput = verifyInput;
module.exports.getFullUrl = getFullUrl;
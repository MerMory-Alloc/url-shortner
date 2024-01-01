const Url = require('./db_connect')

async function createUrl(fullUrl) {
  try {
    const shortUrl = generateShortUrl(); 
    const url = new Url({
        fullUrl:fullUrl,
        shortUrl:shortUrl 
    });
    await url.save();
    console.log('URL created successfully:', url);
    return url.shortUrl;
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
      const url = await Url.findOne({ fullUrl: longUrl });
      if (url) {
        console.log('URL found:', url);
        return url.shortUrl;
      } else {
        console.log('URL not found');
        return null;
      }
    } catch (error) {
      console.error('Error finding URL:', error);
      throw new Error('Could not find the Url in the Database');
    }
  }



  function verifyInput(input) {
    if (typeof input !== 'object') {
      throw new Error('Input must be an object');
    }
  
    if (!input.fullUrl) {
      throw new Error('Input must have a "fullUrl" property');
    }
  
    const fullUrl = input.fullUrl;
  
    if (typeof fullUrl !== 'string') {
      throw new Error('Value of "fullUrl" must be a string');
    }
  
  
    if (!isValidURL(fullUrl)) {
      throw new Error('Value of "fullUrl" must be a valid HTTP or HTTPS URL');
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

  async function getFullUrl(shortUrl) {
    try {
      const url = await Url.findOne({ shortUrl: shortUrl });
      if (url) {
        console.log('URL found:', url);
        return url.fullUrl;
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
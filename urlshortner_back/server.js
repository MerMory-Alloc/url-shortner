const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {createUrl,findShortUrl,verifyInput,getFullUrl} = require('./urlController');


dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: '*',
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Middleware to validate the request body
const validateRequestBody = (req, res, next) => {
    const inputedValue = req.body;
  
        verifyInput(inputedValue)
            .then(() => {
                console.log('Request body is valid');
                next();
            })
            .catch((error) => {
                console.error('Request body is invalid:', error);
                res.status(400).json({ error: error.message });
            });
  
  };

// Middleware to check if the long URL exists in the database
const checkLongUrlInDb = (req, res, next) => {
    const { original_url } = req.body;
  
    findShortUrl(original_url)
      .then((short_url) => {
        if (short_url) {
          // The long URL was found
          console.log("found in the DB");
          res.status(200).json({
            original_url: original_url,
            short_url: short_url,
            message: "found in the DB",
          });
        } else {
          // The long URL was not found
          console.log("not found in the DB");
          next();
        }
      })
      .catch((error) => {
        console.error('Error while checking long URL in DB:', error);
        res.status(400).json({ error: error.message });
      });
  };
  
  // Middleware to create the short URL
  const createShortUrl = (req, res, next) => {
    const {original_url} = req.body;
  
    createUrl(original_url)
      .then((short_url) => {
        console.log("URL created");
        res.status(200).json({
          original_url: original_url,
          short_url: short_url,
          message: "URL created",
        });
      })
      .catch((error) => {
        console.error('Error while creating short URL:', error);
        res.status(400).json({ error: error.message });
      });
  };
  
  // Route handler
  app.post(
    '/api/shorturl',
    validateRequestBody,
    checkLongUrlInDb,
    createShortUrl
  );

  app.get('/api/shorturl/:short_url',(req, res) => {
    const { short_url } = req.params;

    const shortUrlRegex = /^[a-zA-Z0-9]{7}$/;
    if (!shortUrlRegex.test(short_url)) {
      return res.status(400).json({ error: 'Invalid short URL format' });
    }

    getFullUrl(short_url)
        .then((original_url) => {
            if (original_url) {
                
                res.redirect(302,original_url)
            }
            else {
                res.status(404).json({ error: 'Short URL not found' });
            }
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        })
  });
  

// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


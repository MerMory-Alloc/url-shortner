const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {createUrl,findShortUrl,verifyInput,getFullUrl} = require('./urlController');


dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/api/v1/hello', (req, res) => {
  res.send('Hello, World!');
});

app.post('/api/v1/shorten', (req, res) => {

    try {
        const inputedValue = req.body;
        verifyInput(inputedValue);

        const { fullUrl } = inputedValue;

        findShortUrl(fullUrl)
            .then((shortUrl) => {
                if (shortUrl) {
                // The long URL was found
                    res.status(200).json({
                        fullUrl:fullUrl,
                        shortUrl:shortUrl,
                        message: "found in the DB"
                    });
                } else {
                // The long URL was not found
                    createUrl(fullUrl)
                        .then((shortUrl)=> {
                            res.status(200).json({
                                fullUrl:fullUrl,
                                shortUrl:shortUrl,
                                message:"url created"
                            });
                        })
                        .catch((error) => {
                            res.status(400).json({ error: error.message });
                        })
                }
            })
            .catch((error) => {
                res.status(400).json({ error: error.message });
            })

        
    } catch (error) {
        res.status(400).json({ error: error.message });
      }
    
  });


  app.get('/:shortUrl',(req, res) => {
    const { shortUrl } = req.params;

    const shortUrlRegex = /^[a-zA-Z0-9]{7}$/;
    if (!shortUrlRegex.test(shortUrl)) {
      return res.status(400).json({ error: 'Invalid short URL format' });
    }

    getFullUrl(shortUrl)
        .then((fullUrl) => {
            if (fullUrl) {
                
                res.redirect(301,fullUrl)
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


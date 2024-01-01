'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.css'
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [existingUrls, setExistingUrls] = useState([]);

  
  const Protocol=process.env.NEXT_PUBLIC_PROTOCOL;
  const BackendUrl=process.env.NEXT_PUBLIC_URL;
  const Port=process.env.NEXT_PUBLIC_PORT;

  const COMPLET_BACK_URL=Protocol+BackendUrl+Port;

  useEffect(() => {
    // Fetch existing data from local storage on component mount
    const storedUrls = JSON.parse(localStorage.getItem('urls')) || [];
    setExistingUrls(storedUrls);
  }, []); 

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsValidUrl(true);
  };

  const isDataUnique = (newData) => {
    // Check if the new data already exists in the existingData state
    return !existingUrls.some((data) => data.fullUrl === newData.fullUrl);
  };

  const handleButtonClick = async () => {
    const urlPattern = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/i;
    const isValid = urlPattern.test(inputValue);

    if (isValid) {
      try {
        const apiUrl = COMPLET_BACK_URL+"api/v1/shorten";
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fullUrl: inputValue }),
        });

        

        if (response.ok) {
          
          // Handle a successful response here
          const data = await response.json();

          if (isDataUnique(data)) {

            // Update the state with the new data
            // Save the updated array back to local storage
            setExistingUrls((prevData) => {
              localStorage.setItem('urls', JSON.stringify([data,...prevData]));
              console.log('POST request successful', data);
              return [data,...prevData];
            });
            setInputValue('');
            
          } else {
            console.warn('Url already exists in local storage:', data);
          }
        } else {
          // Handle an error response here
          console.error('POST request failed');
        }
      } catch (error) {
        console.error('Error while making the POST request', error);
      }
    } else {
      setIsValidUrl(false);
    }
  };

  const handleCopyClick = (shortUrl) => {
    navigator.clipboard.writeText(COMPLET_BACK_URL+shortUrl)
      .then(() => {
        toast.success('URL copied to clipboard', {
          duration: 1500,
          iconTheme: {
            primary: '#2acfcf',
            secondary: '#fff',
          },
          style: {
            borderRadius: '10px',
            background: '#3b3054',
            color: '#fff',
          },
        });
      })
      .catch((error) => {
        console.error('Unable to copy URL to clipboard', error);
      });
  };

  return (
    <main className={styles.main}>
      <div className={styles.logo_cont}>
        <div className={styles.logo}>Shortly</div>
      </div>
      <section className={styles.header_back}>
        <h2 className={styles.title}>More than just shorter links</h2>
        <p className={styles.parag}>
          Build your brand's recognition and get detailed insights on how your links are performing.
        </p>
      </section>
      <section className={styles.url_card_section}>
        <div className={styles.url_card_cont}>
          <div className={styles.url_card}>
            <div className={styles.input_cont}>

              <input  className={styles.input} 
                      placeholder="Shorten a link here..." 
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange} 
                      style={{ borderColor: isValidUrl ? '' : 'red' }} />
              
              {!isValidUrl && <p style={{ color: 'red' }}>Please enter a valid URL.</p>}

              <button className={styles.short_btn} 
                      type='submit'
                      onClick={handleButtonClick}>

                        Shorten It!
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.url_list_sec}>
        {existingUrls.map((data, index) => (
          <div key={index} className={styles.url_list_card}>
            <p className={styles.full_url}>{data.fullUrl}</p>
            <div className={styles.shrt_url_cont}>
              <a href={COMPLET_BACK_URL+data.shortUrl} target="_blank" rel="noopener noreferrer" className={styles.link_to_url}>
                {BackendUrl+Port+data.shortUrl}
              </a>
              <span
                role="img"
                aria-label="Copy to Clipboard"
                onClick={() => handleCopyClick(data.shortUrl)}
                className={styles.clipboard_icon}
              >
                📋
              </span>
            </div>
          </div>
        ))}
      </section>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </main>
  )
}


import styles from '@/app/page.module.css';
import { useState, useEffect , useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import  {SharedStateContext}  from '@/componenets/SharedStateProvider';


const UrlList = () => {

    const [existingUrls, setExistingUrls] = useContext(SharedStateContext);

    const NAMESPACE=process.env.NEXT_PUBLIC_NAMESPACE;
    const COMPLET_BACK_URL=process.env.NEXT_PUBLIC_COMPLET_BACK_URL;


      const handleCopyClick = (short_url) => {
        navigator.clipboard.writeText(COMPLET_BACK_URL+short_url)
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
    <div className={styles.url_list_sec}>
        {existingUrls.map((data, index) => (
          <div key={index} className={styles.url_list_card}>
            <p className={styles.full_url}>{data.original_url}</p>
            <div className={styles.shrt_url_cont}>
              <a href={COMPLET_BACK_URL+data.short_url} target="_blank" rel="noopener noreferrer" className={styles.link_to_url}>
                {NAMESPACE+data.short_url}
              </a>
              <span
                role="img"
                aria-label="Copy to Clipboard"
                onClick={() => handleCopyClick(data.short_url)}
                className={styles.clipboard_icon}
              >
                📋
              </span>
            </div>
          </div>
        ))}
        <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      </div>
  )
}

export default UrlList

import styles from '@/app/page.module.css';
import { useState  , useContext } from 'react';
import addUrl from '@/actions/addUrl';
import  {SharedStateContext}  from '@/componenets/SharedStateProvider';


const Form = () => {
    
    const [fresponse, setFResponse] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [existingUrls, setExistingUrls] = useContext(SharedStateContext);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setFResponse({});
      };

      const isDataUnique = (newData) => {
        // Check if the new data already exists in the existingData state
        return !existingUrls.some((data) => data.original_url === newData.original_url);
      };


      async function formAction(formData) {

        const res = await addUrl(formData);

        if(res.message){
        setFResponse(res);
        } else {
            if(res.data) {
                const data = res.data;
                if (isDataUnique(data)) {
  
                    // Update the state with the new data
                    // Save the updated array back to local storage
                    setExistingUrls((prevData) => {
                      localStorage.setItem('urls', JSON.stringify([data,...prevData]));
                      console.log('POST request successful', data);
                      return [data,...prevData];
                    });
                    
                  } else {
                    if (data.message === "found in the DB") {
                      setExistingUrls((prevData) => {
                        const newData = [...prevData];
                        const existingIndex = newData.findIndex(obj => JSON.stringify(obj) === JSON.stringify(data));
                    
                        if (existingIndex > -1) {
                          // Move the existing object to the beginning of the array
                          const existingObject = newData[existingIndex];
                          newData.splice(existingIndex, 1);
                          newData.unshift(existingObject);
                        }
                    
                        // Update local storage with the updated data
                        localStorage.setItem('urls', JSON.stringify(newData));
                    
                        console.log('POST request successful', data);
                        return newData;
                      });
                    }
                    console.warn('Url already exists in local storage:', data);
                  }
            }
            setInputValue('');
            setFResponse({});
        }

      }

  return (
    <form className={styles.input_cont} action={formAction}>

              <input  className={styles.input} 
                      placeholder="Shorten a link here..." 
                      type="text"
                      name='url'
                      value={inputValue}
                      onChange={handleInputChange} 
                      required
                      style={{ borderColor: !fresponse.message ? '' : 'red' }} />
      {fresponse.message && <p style={{ color: 'red' }}>{fresponse.message}</p>}
    
              <button className={styles.short_btn} type='submit'>
                Shorten It!
              </button>
    </form>
  )
}

export default Form
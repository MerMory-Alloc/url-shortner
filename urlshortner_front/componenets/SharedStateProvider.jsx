import { useState, createContext, useEffect } from 'react';

export const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
    const [existingUrls, setExistingUrls] = useState([]);

    useEffect(() => {
        // Fetch existing data from local storage on component mount
        const storedUrls = JSON.parse(localStorage.getItem('urls')) || [];
        setExistingUrls(storedUrls);
      }, []); 
  
    return (
      <SharedStateContext.Provider value={[existingUrls, setExistingUrls]}>
        {children}
      </SharedStateContext.Provider>
    );
};

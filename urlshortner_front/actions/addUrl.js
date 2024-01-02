'use server'

import { revalidatePath } from 'next/cache';

export default async function addUrl(formData) {

    const COMPLET_BACK_URL=process.env.NODE_ENV_COMPLET_BACK_URL;
    
    const inputValue = formData.get('url');
    const urlPattern = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/i;

    const isValid = urlPattern.test(inputValue);

    if (isValid) {
        try {
          const apiUrl = COMPLET_BACK_URL;
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ original_url: inputValue }),
          });
  
          
  
          if (response.ok) {
            
            // Handle a successful response here
            const data = await response.json();

            revalidatePath('/');

            return {data: data};
  
          } else {
            // Handle an error response here
            const error = await response.json();
            console.error('POST request failed(reponse not okay) ', error.error);
            return {
                message: error.error
              }
          }
        } catch (error) {
            console.error('Error while making the POST request', error);
            return {
                message: 'Error while making the POST request'
              }
        }
      } else {
        return {
            message: 'Please enter a valid URL(needs to start with http or https)'
          }
      }

}
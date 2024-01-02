'use client'

import Form from '@/componenets/Form';
import styles from '@/app/page.module.css'
import UrlList from '@/componenets/UrlList';
import  {SharedStateProvider}  from '@/componenets/SharedStateProvider';


const SecSection = () => {
  return (
    <section className={styles.sec_section}>
        <SharedStateProvider>
            <div className={styles.url_card_section}>
                <div className={styles.url_card_cont}>
                <div className={styles.url_card}>
                    <Form />
                </div>
                </div>
            </div>
            <UrlList/>
        </SharedStateProvider>
    </section>
  )
}

export default SecSection

import SecSection from '@/componenets/SecSection'
import styles from './page.module.css'

export default function Home() {

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
      <SecSection />
    </main>
  )
}

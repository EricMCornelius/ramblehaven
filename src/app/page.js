import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return <div className={styles.main}>
    <h1 className={styles.heading}>Ramblehaven Ranch</h1> <img className={styles.banner} src='img/ramblehaven_cover.jpg'/>
    <div className={styles.navigation}>
      <a href='/blog' className={styles.option}>Blog</a>
    </div>
  </div>;
}

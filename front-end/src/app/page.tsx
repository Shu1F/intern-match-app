import Link from 'next/link';
import React from 'react';
import styles from './styles/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <label className={styles.label}>企業の方はこちら</label>
        <Link href='/signup/company'>
          <button className={styles.button}>Sign Up</button>
        </Link>
        <Link href='/signin/company'>
          <button className={styles.button}>Sign In</button>
        </Link>
        <label className={styles.label}>学生の方はこちら</label>
        <Link href='/signup/student'>
          <button className={styles.button}>Sign Up</button>
        </Link>
        <Link href='/signin/student'>
          <button className={styles.button}>Sign In</button>
        </Link>
      </div>
    </div>
  );
}

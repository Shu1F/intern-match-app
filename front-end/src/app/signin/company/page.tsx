'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/home.module.scss';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/users/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });
      const jwt = res.headers.get('Authorization')?.replace('Bearer ', '');
      if (!res.ok || !jwt) {
        alert('認証に失敗しました。');
        return;
      }
      localStorage.setItem('token', jwt);
      router.push('/profiles');
    } catch (err) {
      alert('ログインに失敗しました。');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログインする</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <label className={styles.label}>メールアドレス</label>
        <input
          className={styles.input}
          type='email'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <label className={styles.label}>パスワード</label>
        <input
          className={styles.input}
          type='password'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button className={styles.button} type='submit'>
          ログインする
        </button>
      </form>
    </div>
  );
};

export default SignInPage;

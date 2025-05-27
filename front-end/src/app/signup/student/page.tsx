'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/home.module.css';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  //   const [role, setRole] = useState("");
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== password_confirmation) {
      alert('パスワードが一致しません');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3001/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            role: 0,
            intern_profile_attributes: {
              name: name,
              university: university,
            },
          },
        }),
      });
      const jwt = res.headers.get('Authorization')?.replace('Bearer ', '');
      if (!res.ok || !jwt) {
        alert('認証に失敗しました。');
        return;
      }
      localStorage.setItem('token', jwt);
      router.push('/dashboard');
    } catch (err) {
      alert('アカウントの作成に失敗しました。');
    }
  };

  return (
    <div className={styles.container}>
      <h1>アカウントを作成する</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
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
        <label className={styles.label}>パスワードの確認</label>
        <input
          className={styles.input}
          type='password'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword_confirmation(e.target.value)
          }
        />
        <label className={styles.label}>名前</label>
        <input
          className={styles.input}
          type='text'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <label className={styles.label}>所属大学</label>
        <input
          className={styles.input}
          type='text'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUniversity(e.target.value)
          }
        />
        <button className={styles.button} type='submit'>
          登録する
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;

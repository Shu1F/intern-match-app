'use client';
import React, { useEffect, useState } from 'react';
import { profileType } from '../types/profileType';
import { useRouter } from 'next/navigation';
import styles from '../styles/home.module.css';
import Link from 'next/link';

const ProfileListPage = () => {
  const [profiles, setProfiles] = useState<profileType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }
    const fetchProfiles = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/v1/intern_profiles`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!res.ok) {
          throw new Error('情報の取得に失敗しました。');
        }
        const resData = await res.json();
        if (Array.isArray(resData)) {
          setProfiles(resData);
        } else {
          console.warn('取得したデータ型が配列ではありません。');
        }
      } catch (error) {
        console.error('fetchに失敗しました。', error);
      }
    };
    fetchProfiles();
  }, []);
  return (
    <div className={styles.container}>
      <h1>学生一覧</h1>
      {profiles.length === 0 ? (
        <p>登録がありません。</p>
      ) : (
        profiles.map((profileContent) => (
          <div className={styles.profileCard} key={profileContent.id}>
            <h2>氏名：{profileContent.name}</h2>
            <p>大学：{profileContent.university}</p>
            <Link href={`profiles/${profileContent.user_id}/messages`}>
              <button className={styles.button}>メッセージを送信する</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ProfileListPage;

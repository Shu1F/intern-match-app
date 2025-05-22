"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  //   const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== password_confirmation) {
      alert("パスワードが一致しません");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3001/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            role: 1,
            company_profile_attributes: {
              name: name,
              company: company,
            },
          },
        }),
      });
      const jwt = res.headers.get("Authorization")?.replace("Bearer ", "");
      if (jwt) localStorage.setItem("token", jwt);
      router.push("/profiles");
    } catch (err) {
      alert("アカウントの作成に失敗しました。");
    }
  };

  return (
    <div>
      <h1>アカウントを作成する</h1>
      <form onSubmit={handleSubmit}>
        <label>メールアドレス</label>
        <input
          type="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <label>パスワード</label>
        <input
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <label>パスワードの確認</label>
        <input
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword_confirmation(e.target.value)
          }
        />
        <label>名前</label>
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <label>会社名</label>
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCompany(e.target.value)
          }
        />
        <button type="submit">登録する</button>
      </form>
    </div>
  );
};

export default SignUpPage;

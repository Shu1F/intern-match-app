"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter, useParams } from "next/navigation";

// type messageType = {
//   body: string;
//   sender_id: number;
// };

const MessagePage = () => {
  const [body, setBody] = useState("");
  const router = useRouter();
  const { id } = useParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("トークンがありません。");
      return;
    }

    try {
      console.log("fetchを始めます。");
      const res = await fetch(`http://localhost:3001/api/v1/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            receiver_id: Number(id),
            body: body,
          },
        }),
      });
      console.log("fetchしました。");
      if (!res.ok) {
        throw new Error("情報の取得に失敗しました。");
      } else {
        alert("メッセージを送信しました。");
        router.push("/profiles");
      }
    } catch (err) {
      console.error(err);
      alert("メッセージの送信に失敗しました。");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={(e) => setBody(e.target.value)}
          placeholder="メッセージを入力"
          required
          style={{ width: "100%" }}
          value={body}
        />
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default MessagePage;

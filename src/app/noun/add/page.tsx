"use client";

import React, { FormEvent, useState } from "react";
import styles from "@/app/ui/noun/addNoun/addNoun.module.css";
import { useMutation } from "@tanstack/react-query";

const AddNounPage: React.FC = () => {
  const [content, setContent] = useState("");

  const postNoun = async (content: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}schdic/api/v1/dic/noun`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: content }),
        }
      );
      if (!response.ok) {
        throw new Error("잘못된 요청입니다.");
      }
      return response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { mutate } = useMutation({
    mutationKey: "postNoun",
    mutationFn: postNoun,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(content);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="사용자 사전"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          등록하기
        </button>
      </form>
    </div>
  );
};

export default AddNounPage;

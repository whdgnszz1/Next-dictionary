"use client";

import React, { FormEvent, useState } from "react";
import styles from "@/app/ui/noun/addNoun/addNoun.module.css";

const AddNounPage: React.FC = () => {
  const [content, setContent] = useState("");
  const handleClick = (event) => {
    event.preventDefault(); // 이벤트의 기본 동작을 중단
    console.log(1);
    console.log("Attempting to add noun with content:", content);
    mutate(content, {
      onSuccess: (response) => {
        console.log("Noun added successfully", response.data);
        setContent("");
      },
      onError: (error) => {
        console.error("Error adding noun", error);
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="사용자 사전"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          등록하기
        </button>
      </div>
    </div>
  );
};

export default AddNounPage;

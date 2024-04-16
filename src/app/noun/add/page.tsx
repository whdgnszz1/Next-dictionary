"use client";

import React, { FormEvent, useState } from "react";
import styles from "@/app/ui/noun/addNoun/addNoun.module.css";
import { useCreateNoun } from "@/lib/noun/hooks";
import { useRouter } from "next/navigation";

const AddNounPage: React.FC = () => {
  const [content, setContent] = useState("");
  const router = useRouter();

  const { mutate: createNoun } = useCreateNoun({
    onSuccess: () => {
      console.log("단어가 성공적으로 추가되었습니다.");
      router.push("/noun");
    },
    onError: (error) => {
      console.error("단어 추가 중 오류가 발생했습니다.", error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNoun({ content });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="단어 입력"
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

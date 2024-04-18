"use client";

import React, { FormEvent, useState } from "react";
import styles from "@/app/ui/stop/addStop/addStop.module.css";
import { useRouter } from "next/navigation";
import { useCreateStop } from "@/lib/stop";

const AddStopPage: React.FC = () => {
  const [content, setContent] = useState("");
  const router = useRouter();

  const { mutate: createStop } = useCreateStop({
    onSuccess: () => {
      console.log("단어가 성공적으로 추가되었습니다.");
      router.push("/stop");
    },
    onError: (error) => {
      console.error("단어 추가 중 오류가 발생했습니다.", error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createStop({ content });
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

export default AddStopPage;

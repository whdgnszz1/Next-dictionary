"use client";

import React, { FormEvent, useState } from "react";
import styles from "@/app/ui/synonym/addSynonym/addSynonym.module.css";
import { useRouter } from "next/navigation";
import { useCreateSynonym } from "@/lib/synonym";

const AddSynonymPage: React.FC = () => {
  const [content, setContent] = useState("");
  const [isOneWay, setIsOneWay] = useState("0");
  const router = useRouter();

  const { mutate: createSynonym } = useCreateSynonym({
    onSuccess: () => {
      console.log("단어가 성공적으로 추가되었습니다.");
      router.push("/synonym");
    },
    onError: (error) => {
      console.error("단어 추가 중 오류가 발생했습니다.", error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSynonym({ content, isOneWay });
  };

  const handleOneWayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOneWay(e.target.value);
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
        <div>
          <label>
            <input
              type="radio"
              name="direction"
              value="1"
              checked={isOneWay === "1"}
              onChange={handleOneWayChange}
            />
            단방향 적용
          </label>
          <label>
            <input
              type="radio"
              name="direction"
              value="0"
              checked={isOneWay === "0"}
              onChange={handleOneWayChange}
            />
            양방향 적용
          </label>
        </div>
        <button type="submit" className={styles.button}>
          등록하기
        </button>
      </form>
    </div>
  );
};

export default AddSynonymPage;

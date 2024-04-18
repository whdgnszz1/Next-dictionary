"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/ui/noun/singleNoun/singleNoun.module.css";
import {
  UpdateSynonymDto,
  useGetSynonym,
  useUpdateSynonym,
} from "@/lib/synonym";

interface SingleNounPageProps {
  params: {
    id: string;
  };
}

const SingleNounPage = ({ params }: SingleNounPageProps) => {
  const synonymId = parseInt(params.id);
  const { data } = useGetSynonym(synonymId);
  const synonym = data?.data;
  const router = useRouter();

  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState("0");
  const [isOneWay, setIsOneWay] = useState("0");

  useEffect(() => {
    if (synonym) {
      setContent(synonym.content || "");
      setIsActive(synonym.isActive === "1" ? "1" : "0");
      setIsOneWay(synonym.isOneWay === "1" ? "1" : "0");
    }
  }, [synonym]);

  const updateNoun = useUpdateSynonym({
    onSuccess: () => {
      console.log("동의어 사전이 성공적으로 수정되었습니다.");
      router.push("/synonym");
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const handleIsActiveChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsActive(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateDto: UpdateSynonymDto = {
      id: synonymId,
      content: content,
      isActive: isActive,
      isOneWay: isOneWay,
    };
    updateNoun.mutate(updateDto);
  };

  const handleOneWayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOneWay(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>사용자 사전</label>
          <input
            type="text"
            name="content"
            placeholder="사용자 사전 내용 입력"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <label>적용</label>
          <select
            name="isActive"
            value={isActive}
            onChange={handleIsActiveChange}
          >
            <option value="1">예</option>
            <option value="0">아니오</option>
          </select>
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
          <button type="submit">수정</button>
        </form>
      </div>
    </div>
  );
};

export default SingleNounPage;

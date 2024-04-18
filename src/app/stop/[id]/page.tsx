"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/ui/noun/singleNoun/singleNoun.module.css";
import { UpdateStopDto, useGetStop, useUpdateStop } from "@/lib/stop";

interface SingleStopPageProps {
  params: {
    id: string;
  };
}

const SingleStopPage = ({ params }: SingleStopPageProps) => {
  const stopId = parseInt(params.id);
  const { data } = useGetStop(stopId);
  const stop = data?.data;
  const router = useRouter();

  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState("0");

  useEffect(() => {
    if (stop) {
      setContent(stop.content || "");
      setIsActive(stop.isActive === "1" ? "1" : "0");
    }
  }, [stop]);

  const updateStop = useUpdateStop({
    onSuccess: () => {
      console.log("노출 금지 사전이 성공적으로 수정되었습니다.");
      router.push("/stop");
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
    const updateDto: UpdateStopDto = {
      id: stopId,
      content: content,
      isActive: isActive,
    };
    updateStop.mutate(updateDto);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>사용자 사전</label>
          <input
            type="text"
            name="content"
            placeholder="노출 금지 사전 내용 입력"
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
          <button type="submit">수정</button>
        </form>
      </div>
    </div>
  );
};

export default SingleStopPage;

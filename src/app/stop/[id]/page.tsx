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

  useEffect(() => {
    if (stop) {
      setContent(stop.content || "");
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateDto: UpdateStopDto = {
      id: stopId,
      content: content,
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
          <button type="submit">수정</button>
        </form>
      </div>
    </div>
  );
};

export default SingleStopPage;

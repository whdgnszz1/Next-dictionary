"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/ui/noun/singleNoun/singleNoun.module.css";
import { UpdateNounDto } from "@/lib/noun";
import { useUpdateNoun } from "@/lib/noun/hooks/useUpdateNoun";
import { useGetNoun } from "@/lib/noun/hooks/useGetNoun";

interface SingleNounPageProps {
  params: {
    id: string;
  };
}

const SingleNounPage = ({ params }: SingleNounPageProps) => {
  const nounId = parseInt(params.id);
  const { data } = useGetNoun(nounId);
  const noun = data?.data;
  const router = useRouter();

  const [content, setContent] = useState("");

  useEffect(() => {
    if (noun) {
      setContent(noun.content || "");
    }
  }, [noun]);

  const updateNoun = useUpdateNoun({
    onSuccess: () => {
      console.log("사용자 사전이 성공적으로 수정되었습니다.");
      router.push("/noun");
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateDto: UpdateNounDto = {
      id: nounId,
      content: content,
    };
    updateNoun.mutate(updateDto);
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
          <button type="submit">수정</button>
        </form>
      </div>
    </div>
  );
};

export default SingleNounPage;

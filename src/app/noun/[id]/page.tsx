"use client";

import styles from "@/app/ui/noun/singleNoun/singleNoun.module.css";
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
  console.log(noun);
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="hidden" name="id" value={noun?.id} />
          <label>사용자 사전</label>
          <input
            type="text"
            name="content"
            placeholder={noun?.content}
            value={noun?.content}
          />
          <label>적용</label>
          <select name="isActive" defaultValue={noun?.isActive?.toString()}>
            <option value="true">예</option>
            <option value="false">아니오</option>
          </select>
          <button type="submit">수정</button>
        </form>
      </div>
    </div>
  );
};

export default SingleNounPage;

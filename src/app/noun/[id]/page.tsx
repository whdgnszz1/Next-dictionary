// import styles from "@/app/ui/noun/singleNoun/singleNoun.module.css";
// import { updateUser } from "@/lib/actions";

// interface SingleNounPageProps {
//   params: {
//     id: string;
//   };
// }

// const SingleNounPage = async ({ params }: SingleNounPageProps) => {
//   const { id } = params;

//   return (
//     <div className={styles.container}>
//       <div className={styles.formContainer}>
//         <form action={updateUser} className={styles.form}>
//           <input type="hidden" name="id" value={user?.id} />
//           <label>사용자 사전</label>
//           <input type="text" name="username" placeholder={user?.username} />
//           <label>적용</label>
//           <select name="isActive" defaultValue={user?.isActive.toString()}>
//             <option value="true">예</option>
//             <option value="false">아니오</option>
//           </select>
//           <button type="submit">수정</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SingleNounPage;

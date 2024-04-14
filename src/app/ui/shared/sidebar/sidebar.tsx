import React from "react";
import styles from "./sidebar.module.css";
import {
  MdAttachMoney,
  MdShoppingBag,
  MdSupervisedUserCircle,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";

const menuItems = [
  {
    title: "사전 관리",
    list: [
      {
        title: "사용자 사전",
        path: "/noun",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "동의어 사전",
        path: "/synonym",
        icon: <MdShoppingBag />,
      },
      {
        title: "노출 금지 사전",
        path: "/stop",
        icon: <MdAttachMoney />,
      },
    ],
  },
];

function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="/kyobobook_meta.png"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>교보문고</span>
          <span className={styles.userTitle}>주문검색개발팀</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;

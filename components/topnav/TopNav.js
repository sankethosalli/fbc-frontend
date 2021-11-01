import Link from "next/link";
import React from "react";
import styles from "../../styles/topnav/TopNav.module.css";
import { Avatar, IconButton } from "@material-ui/core";

const TopNav = () => {
  const profileIcon = true;

  return (
    <div>
      <div className={styles.topnav__wrapper}>
        <div className={styles.topnav__left}>
          <Link href="/campaign/">
            <IconButton>
              <img draggable="false" src="/logo.png" className={styles.logo} />
            </IconButton>
          </Link>
        </div>

        <div className={styles.topnav__right}>
          <span className={styles.topnav__right__element}>
            <Link href="/campaign/">Campaign</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopNav;

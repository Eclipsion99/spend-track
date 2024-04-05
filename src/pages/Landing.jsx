import React from "react";
import styles from "../styles/Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {

  return (
    <div className={styles.body}>
      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500&family=Libre+Baskerville:wght@400;700&family=Marcellus&family=Nunito+Sans:opsz,wght@6..12,400;6..12,500&family=Unna&display=swap"
        rel="stylesheet"
      />
      <div className={styles.left}></div>
      <div className={styles.right}>
        <div className={styles.top}>
          <h1 className={styles.heading}>SPEND TRACK</h1>
          <h2 className={styles.text}>Track your expenses better than ever</h2>
        </div>
        <div className={styles.bottom}>
          <Link to="/Login" className={styles.gStarted}>
            GET STARTED
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

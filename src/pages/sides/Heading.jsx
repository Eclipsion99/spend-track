import React from "react";
import styles from "/Users/mainak/Desktop/Expense Tracker/my-app/src/styles/Homepage.module.css";

const Heading = () => {
  return (
    <section id={styles.main}>
      <div className={styles.innerMain}>
        <div className={styles.innerText}>
          <h1 className={styles.innerHeading}>Why Spend Track?</h1>
          <div className={styles.innerContentBox}>
            <p className={styles.innerContent}>
              Spend Track ensures the security of your financial data while
              providing convenient access to your expenses. Effortlessly track
              and manage your spending with our user-friendly platform,
              empowering you to make informed financial decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heading;

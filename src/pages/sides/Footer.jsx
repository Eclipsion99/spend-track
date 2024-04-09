import React from 'react'
import styles from "../features/Expense/CSS/Footer.module.css"
import fb from "../../Images/ri--facebook-fill.svg"
import insta from "../../Images/fa6-brands--instagram.svg"
import twitter from "../../Images/pajamas--twitter.svg"
import linkedin from "../../Images/ant-design--linkedin-outlined.svg"

const Footer = () => {
  return (
    <div className={styles.main}>
        <div className={styles.logoDiv}>
            <img className={styles.logo} src={fb} alt="fb-logo" />
            <img className={styles.logo} src={insta} alt="insta-logo" />
            <img className={styles.logo} src={twitter} alt="twitter-logo" />
            <img className={styles.logo + ' ' + styles.ln} src={linkedin} alt="ln-logo" />
        </div>
        <div className={styles.textDiv}>
            <p className={styles.text}>Contact us</p>
            <p className={styles.text}>Our services</p>
            <p className={styles.text}>Privacy services</p>
            <p className={styles.text}>Terms and conditions</p>
        </div>
        <div>
            <p className={styles.bottomText}>Copyright©2021 - All rights reserved || Designed By: Mainak</p>
        </div>
    </div>
  )
}

export default Footer

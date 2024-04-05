import React, {useState, useEffect} from "react";
import styles from "/Users/mainak/Desktop/Expense Tracker/my-app/src/styles/Homepage.module.css";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";

const Navbar = ({token}) => {

  let navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }
  
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    fetchUser();
  }, [setUser]);
  
  async function fetchUser() {
    const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", token.user.email);
    setUser(data);
    if (error) {
      console.error("Error fetching users:", error.message);
      return;
    }
  }

  const name = user.length > 0 ? user[0].full_name.split(" ")[0] : '';
  console.log(name);

  const [menuShow, setMenuShow] = useState(false);

  const menuBox = {
    transform: menuShow ? "translateY(5px)" : "translateY(20px)",
    opacity: menuShow ? 1 : 0,
    zIndex: menuShow ? 1 : -1,
    transition: ".3s",
  };

  const menuBar1 = {
    transform: menuShow
      ? "rotate(137deg) translateY(-9px) translateX(15px)"
      : "rotate(0) translateY(0px) translateX(0px)",
    transition: ".2s",
  };

  const menuBar2 = {
    transform: menuShow
      ? "rotate(-137deg) translateY(9px) translateX(15px)"
      : "rotate(0) translateY(0px) translateX(0px)",
    transition: ".2s",
  };

  const opacity = {
    opacity: menuShow ? 0 : 1,
    transition: ".2s",
  };
  return (
    <div>
        <section id={styles.nav}>
        <div className={styles.navTextDiv}>
            <p className={styles.navText}>SPEND TRACK</p>
        </div>
        <div
            className={styles.navMenuWhole}
            onClick={() => setMenuShow((prev) => !prev)}
        >
            <div className={styles.navMenu} style={menuBar1}>
            <div className={styles.navLcircle}></div>
            <div className={styles.navMenuLine}></div>
            <div className={styles.navRcircle}></div>
            </div>
            <div className={styles.navMenu} style={opacity}>
            <div className={styles.navLcircle}></div>
            <div className={styles.navMenuLine}></div>
            <div className={styles.navRcircle}></div>
            </div>
            <div className={styles.navMenu} style={menuBar2}>
            <div className={styles.navLcircle}></div>
            <div className={styles.navMenuLine}></div>
            <div className={styles.navRcircle}></div>
            </div>
        </div>
        </section>
        <section id={styles.options} style={menuBox}>
          <h1 className={styles.name}>{name}</h1>
          <div className={styles.hline}></div>
          <p className={styles.text}>About</p>
          <p className={styles.text}>Contact</p>
          <p className={styles.text}>Services</p>
          <button onClick={handleLogout} className={styles.btn}>Logout</button>
        </section>
    </div>
  );
};

export default Navbar;

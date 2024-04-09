import React, { useState, useEffect } from "react";
import styles from "../CSS/Update.module.css";
import { supabase } from "../../../../client";
import arrow from "../../../../Images/down-arrow.png";

const Update = ({ token, toggle, setTest, id, setId }) => {

  const [users, setUsers] = useState([]);
  const [len, setLen] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [visibleRows, setVisibleRows] = useState(0);
  
  useEffect(() => {
    if (users.length > 3) {
      setLen(true);
    } else {
      setLen(false);
    }
  }, [users]);

  const xx = (z) => {
    setId([z.id, true]);
    setTest(!toggle);
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  async function fetchUsers() {
    const { data, error } = await supabase
      .from("budgets")
      .select("*")
      .eq("email", token.user.email)
      .order("datetime", { ascending: true });
      
    if (error) {
      console.error("Error fetching completed tasks:", error.message);
    } else {
      setUsers(data);
    }
  }

  const handleShowRows = () => {
    if (isShowing) {
      for (let i = users.length; i > 0; i--) {
        setTimeout(() => {
          setVisibleRows(i - 1);
        }, (users.length - i) * 100);
      }
    } else {
      for (let i = 0; i < users.length; i++) {
        setTimeout(() => {
          setVisibleRows(i + 1);
        }, i * 100);
      }
    }
    setIsShowing(!isShowing);
  };

  const topData = users.slice(0, 3);
  const bottomData = users.slice(3);

  return (
    <div className={styles.main}>
      <h1 className={styles.addHead}>Update Budget</h1>
      <table className={styles.tableMain}>
        <thead>
          <tr className={styles.trHead}>
            <div className={styles.amountHeadDiv}>
              <th className={styles.amountHead}>Amount</th>
            </div>
            <div className={styles.descriptionHeadDiv}>
              <th className={styles.descriptionHead}>Description</th>
            </div>
            <div className={styles.dateHeadDiv}>
              <th className={styles.dateHead}>Date</th>
            </div>
            <div className={styles.updateHeadDiv}>
              <th></th>
            </div>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {topData.map((user) => (
            <tr className={styles.trBody} key={user.id}>
              <div className={styles.bodyLeft}>
                <div className={styles.amountBodyDiv}>
                  <td className={styles.amountBody}>{user.amount}</td>
                </div>
                <div className={styles.descriptionBodyDiv}>
                  <td className={styles.descriptionBody}>{user.description}</td>
                </div>
                <div className={styles.dateBodyDiv}>
                  <td className={styles.dateBody}>
                    {new Date(user.datetime).toLocaleString(undefined, {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </td>
                </div>
              </div>

              <div className={styles.updateBodyDiv}>
                <button className={styles.editBtn} onClick={() => xx(user)}>Edit</button>
              </div>
            </tr>
          ))}

          {bottomData.map((user, index) => (
            <tr
            className={`${styles.change} ${styles.trBody} ${index < visibleRows ? styles.fadeIn : styles.fadeOut}`}
              key={user.id}
            >
              <div className={styles.bodyLeft}>
                <div className={styles.amountBodyDiv}>
                  <td className={styles.amountBody}>{user.amount}</td>
                </div>
                <div className={styles.descriptionBodyDiv}>
                  <td className={styles.descriptionBody}>{user.description}</td>
                </div>
                <div className={styles.dateBodyDiv}>
                  <td className={styles.dateBody}>
                    {new Date(user.datetime).toLocaleString(undefined, {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </td>
                </div>
              </div>

              <div className={styles.updateBodyDiv}>
                <button className={styles.editBtn} onClick={() => xx(user)}>Edit</button>
              </div>
            </tr>
          ))}
        </tbody>
        <button onClick={handleShowRows} className={styles.aniBtn + " " + (len ? "" : styles.vis)}>
          <img
            className={styles.arrow + " " + (visibleRows ? styles.reverse : "")}
            src={arrow}
            alt="arrow"
          />
        </button>
      </table>
    </div>
  );
};

export default Update;

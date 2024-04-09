import React, { useState, useEffect } from "react";
import { supabase } from "../../client.js";
import AddExpense from "../features/Expense/Pages/AddExpense.jsx";
import UpdateExpense from "../features/Expense/Pages/UpdateExpense.jsx";
import TrackExpense from "../features/Expense/Pages/TrackExpense.jsx";
import styles from "../features/Expense/CSS/Transactions.module.css";
import dollar from "../../Images/Untitled design (1).png";
import piggy from "../../Images/Untitled design.png";
import graph from "../../Images/Untitled design (2).png";

const Transactions = ({ token, toggle, setTest, id, setId }) => {
  const [users, setUsers] = useState([]);
  const [add, setAdd] = useState(true);
  const [update, setUpdate] = useState(true);
  const [track, setTrack] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("expenses").select("*");
    setUsers(data);
  }

  const addClick = () => {
    setAdd((data) => !data);
    setUpdate(true);
    setTrack(true);
  };

  const updateClick = () => {
    setUpdate((data) => !data);
    setAdd(true);
    setTrack(true);
  };

  const trackClick = () => {
    setTrack((data) => !data);
    setUpdate(true);
    setAdd(true);
  };

  const addBudget = {
    visibility: add ? "hidden" : "visible",
    transform: add ? "translateY(-500px)" : "translateY(-15px)",
    opacity: add ? 0 : 1,
    transition: "1s",
    position: add ? "absolute" : "relative",
    right: add ? "-37.75vw" : "",
    top: 0,
    zIndex: add ? 1 : 0,
  };

  const updateBudget = {
    visibility: update ? "hidden" : "visible",
    transform: update ? "translateY(-500px)" : "translateY(-15px)",
    opacity: update ? 0 : 1,
    transition: "1s",
    position: update ? "absolute" : "relative",
    right: update ? "-37.75vw" : "",
    top: 0,
    zIndex: update ? 1 : 0,
  };

  const trackBudget = {
    visibility: track ? "hidden" : "visible",
    transform: track ? "translateY(-500px)" : "translateY(-15px)",
    opacity: track ? 0 : 1,
    transition: "1s",
    position: track ? "absolute" : "relative",
    right: track ? "-37.75vw" : "",
    top: 0,
    zIndex: track ? 1 : 0,
  };

  return (
    <section id={styles.transactions}>
      <div className={styles.addTransaction}>
        <h1 className={styles.headTransaction}>Transactions</h1>
        <div className={styles.bodyTransaction}>
          <div className={styles.newTransaction}>
            <img className={styles.icon} src={dollar} alt="dollar-img" />
            <p className={styles.newTransactionText}>
              New
              <br className={styles.break}/>
              Expense
            </p>
            <button onClick={addClick} className={styles.newTransactionBtn}>
              ADD
            </button>
          </div>
          <div className={styles.updateTransaction}>
            <img
              className={styles.icon + " " + styles.piggy}
              src={piggy}
              alt="piggy-img"
            />
            <p className={styles.updateTransactionText}>
              Update
              <br className={styles.break}/>
              Expense
            </p>
            <button
              onClick={updateClick}
              className={styles.updateTransactionBtn}
            >
              UPDATE
            </button>
          </div>
          <div className={styles.updateTransaction}>
            <img className={styles.icon} src={graph} alt="graph-img" />
            <p className={styles.updateTransactionText}>
              Track
              <br className={styles.break}/>
              Expenses
            </p>
            <button
              onClick={trackClick}
              className={styles.updateTransactionBtn}
            >
              TRACK
            </button>
          </div>
        </div>
      </div>
      <div className={styles.funcTransactions}>
        <div style={addBudget} className={styles.addExpense}>
          <AddExpense token={token} />
        </div>
        <div style={updateBudget} className={styles.updateExpense}>
          
          {users.length ? <UpdateExpense
            token={token}
            toggle={toggle}
            setTest={setTest}
            id={id}
            setId={setId}
            
          /> : <h1 className={styles.notTrack}>Not enough data</h1>}
        </div>
        <div style={trackBudget} className={styles.trackExpense}>
          {users.length ? <TrackExpense token={token} /> : <h1 className={styles.notTrack}>Not enough data</h1>}
        </div>
      </div>
    </section>
  );
};

export default Transactions;

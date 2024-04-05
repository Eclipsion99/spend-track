import React, { useState, useEffect, useRef } from "react";
import styles from "/Users/mainak/Desktop/Expense Tracker/my-app/src/styles/Homepage.module.css";
import Add from "../features/Budget/Pages/AddBudget.jsx";
import Update from "../features/Budget/Pages/UpdateBudget.jsx";
import { supabase } from "../../client.js";

const Income = ({ token, toggle, setTest, id, setId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase
      .from("budgets")
      .select("*")
      .eq("email", token.user.email);
    if (error) {
      console.error("Error fetching users:", error.message);
      return;
    }

    const categoryMap = new Map();
    data.forEach((entry) => {
      const { description, amount } = entry;
      if (categoryMap.has(description)) {
        categoryMap.set(description, categoryMap.get(description) + amount);
      } else {
        categoryMap.set(description, amount);
      }
    });

    const aggregatedData = Array.from(categoryMap, ([description, amount]) => ({
      description,
      amount,
    }));

    setUsers(aggregatedData);
  }

  const [add, setAdd] = useState(true);
  const [update, setUpdate] = useState(true);

  const addClick = () => {
    setAdd((data) => !data);
    setUpdate(true);
  };

  const updateClick = () => {
    setUpdate((data) => !data);
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

  return (
    <section id={styles.income}>
      <div className={styles.addIncome}>
        <h1 className={styles.headIncome}>Set Budget</h1>
        <div className={styles.bodyIncome}>
          <div className={styles.incomeLeft}>
            <div className={styles.newIncome}>
              <p className={styles.newIncomeText}>Add new Budget</p>
              <button className={styles.newIncomeBtn} onClick={addClick}>
                ADD
              </button>
            </div>
            <div className={styles.updateIncome}>
              <p className={styles.updateIncomeText}>Update Budget</p>
              <button className={styles.updateIncomeBtn} onClick={updateClick}>
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.headExtend}>
        <div style={addBudget} className={styles.addExtend}>
          <Add token={token} />
        </div>
        <div style={updateBudget} className={styles.addExtend}>
          <div style={updateBudget} className={styles.updateExpense}>
            {users.length ? (
              <Update
                token={token}
                toggle={toggle}
                setTest={setTest}
                id={id}
                setId={setId}
              />
            ) : (
              <h1 className={styles.notTrack}>Not enough data</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Income;

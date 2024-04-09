import React, { useState, useEffect } from 'react';
import styles from "../../styles/Homepage.module.css";
import { supabase } from '../../client';

const Display = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    fetchUsersExpenses();
    fetchUsersBudgets();
  }, []);

  async function fetchUsersExpenses() {
    const { data, error } = await supabase
      .from("expenses")
      .select("amount")
      .eq("email", token.user.email);

    if (error) {
      console.error("Error fetching expenses:", error.message);
    } else {
      setUsers(data);
      calculateTotalExpense(data);
    }
  }

  async function fetchUsersBudgets() {
    const { data, error } = await supabase
      .from("budgets")
      .select("amount")
      .eq("email", token.user.email);

    if (error) {
      console.error("Error fetching expenses:", error.message);
    } else {
      setUsers(data);
      calculateTotalBudget(data);
    }
  }

  function calculateTotalExpense(data) {
    let sum = 0;
    data.forEach((i) => {
      sum += i.amount;
    });
    setTotalExpense(sum);
  }

  function calculateTotalBudget(data) {
    let sum = 0;
    data.forEach((i) => {
      sum += i.amount;
    });
    setTotalBudget(sum);
  }

  return (
    <section id={styles.firstDisplay}>
      <div className={styles.innerDisplay}>
        <div className={styles.leftDisplay}>
          <p className={styles.totalDisplay}>Total Expense:</p>
          <p className={styles.totalDisplayExpense + ' ' + (totalExpense == 0 ? styles.gray : "")}>${totalExpense}</p>
        </div>
        <div className={styles.middleDisplay}></div>
        <div className={styles.rightDisplay}>
          <p className={styles.totalDisplay}>Total Budget:</p>
          <p className={styles.totalDisplayBudget + ' ' + (totalBudget == 0 ? styles.gray : "")}>${totalBudget}</p>
        </div>
      </div>
    </section>
  );
};

export default Display;

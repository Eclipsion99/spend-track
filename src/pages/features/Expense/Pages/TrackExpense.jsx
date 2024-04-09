import React, { useState, useEffect } from "react";
import styles from "../CSS/TrackExpense.module.css";
import PieChart from "./PieChart.jsx";
import BarGraph from "./BarGraph.jsx";
import { supabase } from "../../../../client";

const TrackExpense = ({ token }) => {
  const [users, setUsers] = useState([]);

  const data = {
    labels: users.map((data) => data.description),
    datasets: [
      {
        data: users.map((data) => data.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(255, 0, 0, 0.7)" ,
          "rgba(54, 162, 235, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(201, 203, 207, 0.8)",
        ],
      },
    ],
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase
      .from("expenses")
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

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Track your Expenses</h1>
      <div className={styles.hline}></div>
      <div className={styles.inner}>
        <div className={styles.pie}>
          <PieChart chartData={data} />
        </div>
        <div className={styles.vline}></div>
        <div className={styles.bar}>
          <BarGraph chartData={data} />
        </div>
      </div>
    </div>
  );
};

export default TrackExpense;

import React, { useState, useEffect } from "react";
import styles from "/Users/mainak/Desktop/Expense Tracker/my-app/src/pages/features/Expense/CSS/AddExpense.module.css";
import { supabase } from "../../../../client";
import rupee from "/Users/mainak/Desktop/Expense Tracker/my-app/src/Images/rupee-indian.png";
import pencil from "/Users/mainak/Desktop/Expense Tracker/my-app/src/Images/pencil.png";

const AddExpense = (token) => {
  const [z, setZ] = useState(true);
  const [users, setUsers] = useState([]);
  const [newBudget, setBudget] = useState({
    amount: "",
    description: "",
    datetime: "",
  });

  function handleChange(event) {
    setBudget((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("expenses").select("*");
    setUsers(data);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    await supabase
      .from("expenses")
      .insert({
        email: token.token.user.email,
        amount: newBudget.amount,
        description: newBudget.description,
        datetime: newBudget.datetime,
      });
    alert("Budget added");
    window.location.href = '/Homepage';

  }

  return (
    <div className={styles.main}>
      <h1 className={styles.addHead}>Add new Expense</h1>
      <div className={styles.content}>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div className={styles.amountBox}>
            <div className={styles.forImg}>
              <img src={rupee} alt="rupee" className={styles.rupeeIcon} />
            </div>
            <input
              type="number"
              className={styles.amount}
              placeholder="Amount"
              name="amount"
              onChange={handleChange}
            />
          </div>
          <div className={styles.descriptionBox}>
            <div className={styles.forImg}>
              <img src={pencil} alt="pencil" className={styles.rupeeIcon} />
            </div>
            <select
              id={styles.mySelect}
              name="description"
              className={styles.description}
              onChange={handleChange}
            >
              <option
                value=""
                disabled
                selected={z ? true : false}
                onClick={() => {
                  setZ((data) => !data);
                }}
              >
                Category
              </option>
              <option value="Bills">Bills</option>
              <option value="Dining">Dining</option>
              <option value="Education">Education</option>
              <option value="Groceries">Groceries</option>
              <option value="Health">Health</option>
              <option value="Shopping">Shopping</option>
              <option value="Travel">Travel</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className={styles.dateBox}>
            <input
              className={styles.date}
              type="datetime-local"
              name="datetime"
              onChange={handleChange}
            />
          </div>
          <button className={styles.submitBtn} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;

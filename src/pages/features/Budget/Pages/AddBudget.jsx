import React, { useState, useEffect } from "react";
import styles from "../CSS/Add.module.css";
import { supabase } from "../../../../client.js";
import rupee from "../../../../Images/rupee-indian.png";
import pencil from "../../../../Images/pencil.png";

const Add = (props) => {
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
    const { data } = await supabase.from("budgets").select("*");
    setUsers(data);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await supabase.from("budgets").insert({
        email: props.token.user.email,
        amount: newBudget.amount,
        description: newBudget.description,
        datetime: newBudget.datetime
    });

    alert("Budget added");
}

  return (
    <div className={styles.main}>
      <h1 className={styles.addHead}>Add new Budget</h1>
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
              <option value="Salary">Salary</option>
              <option value="Gifts">Gifts</option>
              <option value="Sales">Sales</option>
              <option value="Rental">Rental</option>
              <option value="Interests">Interests</option>
              <option value="Coupons">Coupons</option>
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

export default Add;

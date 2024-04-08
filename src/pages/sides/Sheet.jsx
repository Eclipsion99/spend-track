import React, { useState, useEffect } from "react";
import { supabase } from "../../client";
import styles from "/Users/mainak/Desktop/Expense Tracker/my-app/src/pages/features/Budget/CSS/Sheet.module.css";
import cross from "/Users/mainak/Desktop/Expense Tracker/my-app/src/Images/close.png";

const Sheet = ({ token, toggle, setTest, id, setId }) => {
  const [users, setUsers] = useState([]);
  const [table, setTable] = useState("");
  const [z, setZ] = useState(true);
  const [user, setUser] = useState({
    amount: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    setTable(id[1] ? "budgets" : "expenses");
  }, [id]);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", id[0]);
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        if (data.length > 0) {
          setUser({
            amount: data[0].amount,
            description: data[0].description || "",
            date: data[0].datetime || "",
          });
        }
      }
    }

    if (table) {
      fetchUser();
    }
  }, [id, table, setTest]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("expenses").select("*");
    setUsers(data);
  }

  function handleChange(event) {
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleUpdate() {
    const { data, error } = await supabase
      .from(table)
      .update({ amount: user.amount, description: user.description })
      .eq("id", id[0]);

    if (error) {
      console.error("Error updating user:", error.message);
    } else {
      console.log("User updated successfully:", data);
      setTest((data) => !data);
      window.location.href = '/Homepage';

    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    const { error } = await supabase.from(table).delete().eq("id", id[0]);

    if (error) {
      console.error("Error deleting user: ", error.message);
    } else {
      console.log("User deleted successfully");
      setUser({
        amount: "",
        description: "",
        date: "",
      });
      setTest((data) => !data);
      window.location.href = '/Homepage';

    }
  }

  return (
      <div
        onClick={() => setTest((prevToggle) => !prevToggle)}
        className={styles.main + " " + (toggle ? styles.change : "")}
      >
        <div
          onClick={() => setTest((prevToggle) => !prevToggle)}
          className={styles.whole}
        >
          <form className={styles.formStyle}>
            <img
              className={styles.cross}
              src={cross}
              alt="cross"
              onClick={() => setTest((prevToggle) => !prevToggle)}
            />
            <h1 className={styles.heading}>Update</h1>
            <div className={styles.amountBox}>
              <label className={styles.amountLabel} htmlFor="amount">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={user.amount}
                onChange={handleChange}
                className={styles.amount}
              />
            </div>
            <div className={styles.descriptionBox}>
              <label className={styles.descriptionLabel} htmlFor="description">
                Description
              </label>
              <select
                value={user.description}
                name="description"
                className={styles.description}
                onChange={handleChange}
              >
                <option value="">Category</option>
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
              <label className={styles.dateLabel} htmlFor="date">
                Date
              </label>
              <input
                type="datetime-local"
                name="date"
                value={user.date}
                onChange={handleChange}
                className={styles.date}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleUpdate}
                className={styles.save}
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className={styles.delete}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Sheet;

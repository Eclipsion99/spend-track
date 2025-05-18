import React, { useState, useEffect } from "react";
import styles from "../styles/Homepage.module.css";
import { supabase } from "../client";
import Income from "./sides/Income";
import Navbar from "./sides/Navbar";
import Heading from "./sides/Heading";
import Display from "./sides/Display";
import Sheet from "./sides/Sheet";
import Transactions from "./sides/Transactions";
import Footer from "./sides/Footer";


const Homepage = ({ token }) => {

  const [id, setId] = useState("");
  const [toggle, setTest] = useState(false);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    age: "",
  });
  const [user2, setUser2] = useState({
    id: "",
    name: "",
    age: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("Trail").select("*");
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

  function handleChange2(event) {
    console.log(user2);
    setUser2((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit() {
    await supabase.from("Trail").insert({ name: user.name, age: user.age });
    setUsers(data);
  }

  return (
    <div className={styles.body}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Bodoni+Moda:opsz,wght@6..96,500&family=Libre+Baskerville:wght@400;700&family=Marcellus&family=Nunito+Sans:opsz,wght@6..12,400;6..12,500&family=Unna&display=swap"
        rel="stylesheet"
      />

      <Sheet
        token={token}
        toggle={toggle}
        setTest={setTest}
        id={id}
        setId={setId}
      />

      <Navbar token={token}/>

      <Heading />

      <Display token={token}/>

      <Income
        token={token}
        toggle={toggle}
        setTest={setTest}
        id={id}
        setId={setId}
      />

      <Transactions
        token={token}
        toggle={toggle}
        setTest={setTest}
        id={id}
        setId={setId}
      />

      <Footer/>
    </div>
  );
};

export default Homepage;

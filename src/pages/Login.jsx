import { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import emailIcon from "../Images/outline-email.svg";
import passwordIcon from "../Images/password-outline.svg";
import mainImg from "../Images/cash-flow.png";

function Login({ setToken }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "chatterjeemainak2003@gmail.com",
    password: "123456",
  });

  console.log(formData);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      navigate("/Homepage");
      setToken(data);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.w}>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <div className={styles.left}>
          <img src={mainImg} alt="Image" className={styles.image} />
          <div className={styles.a}>
            <Link className={styles.aa} to="/Signup">
              Create an account
            </Link>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.right}>
          <h1 className={styles.heading}>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.change}>
              <img src={emailIcon} alt="Email" className={styles.icon} />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className={styles.mail}
                onChange={handleChange}
                defaultValue={formData.email}
              />
            </div>
            <hr />

            <div className={styles.change}>
              <img src={passwordIcon} alt="Password" className={styles.icon} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={styles.pw}
                onChange={handleChange}
                defaultValue={formData.password}
              />
            </div>
            <hr />

            <div className={styles.btnBox}>
              <button className={styles.button} type="submit">
                LOGIN
              </button>
            </div>
          </form>
          <div className={styles.small}>
            <Link className={styles.aa} to="/Signup">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

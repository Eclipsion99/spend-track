import { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import styles from "../styles/Signup.module.css";
import userIcon from "../Images/one.svg";
import emailIcon from "../Images/outline-email.svg";
import passwordIcon from "../Images/password-outline.svg";
import mainImg from "../Images/cash-flow.png";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });
      if (error) throw error;
      alert("Check email for verification link");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.w}>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
          <div className={styles.left}>
            <h1 className={styles.head}>Sign Up</h1>
            <form>
              <div className={styles.change}>
                <img src={userIcon} alt="Account" className={styles.icon} />
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={styles.name}
                />
              </div>
              <hr />

              <div className={styles.change}>
                <img src={emailIcon} alt="Email" className={styles.icon} />
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.mail}
                />
              </div>
              <hr />

              <div className={styles.change}>
                <img
                  src={passwordIcon}
                  alt="Password"
                  className={styles.icon}
                />
                <input
                  onChange={handleChange}
                  type="text"
                  name="password"
                  placeholder="Password"
                  className={styles.pw}
                />
              </div>
              <hr />

              <div className={styles.btnBox}>
                <button
                  className={styles.button}
                  type="submit"
                  onClick={handleSubmit}
                >
                  REGISTER
                </button>
              </div>
            </form>
            <div className={styles.small}>
              <Link className={styles.link} to="/Login">Already a member?</Link>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.right}>
            <img className={styles.image} src={mainImg} alt="Image" />
            <div className={styles.a}>
              <Link className={styles.link} to="/Login">Already a member?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import dynamicURL from "../../Utils/urlConfig";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  //   console.log("DATA :", data);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { //API for authenticating the user
      const url = `${dynamicURL}/api/auth`;
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("user", JSON.stringify(res));
      //   console.log("User details :", JSON.stringify(res));
      //   const userDetail = localStorage.getItem("user");
      var path = "/";
      if (res.role === "User") {
        path += "user";
      } else if (res.role === "Airline Employee") {
        path += "employee";
      } else if (res.role === "Airport Employee") {
        path += "airportemp";
      }
      path += "/arrivals";
      navigate(path);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sing In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

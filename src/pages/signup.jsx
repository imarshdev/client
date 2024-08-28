import { Link, useNavigate } from "react-router-dom";
import "../css/signin.css";
import { TouchableOpacity } from "react-native-web";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../userContext";
function SignUp() {
  const { setUserName } = useContext(UserContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users", {
        name,
        password,
      });
      console.log(response.data);
      setUserName(name);
      history("/home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main class="page-center">
      <article class="sign-up">
        <h2 class="sign-up__title">Get started</h2>
        <p class="sign-up__subtitle">
          Start the best possible user experience for you.
        </p>
        <form className="sign-up-form form" onSubmit={handleSubmit}>
          <label className="form-label-wrapper">
            <p className="form-label">Name</p>
            <input
              className="form-input"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label className="form-label-wrapper">
            <p className="form-label">Password</p>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <label className="form-checkbox-wrapper">
            <input className="form-checkbox" type="checkbox" required />
            <span className="form-checkbox-label">
              <span>Remember me next time</span>
            </span>
          </label>
          <TouchableOpacity>
            <button
              className="form-btn primary-default-btn transparent-btn"
              type="submit"
            >
              <span>Sign up</span>
            </button>
          </TouchableOpacity>
        </form>
      </article>
    </main>
  );
}

export default SignUp;

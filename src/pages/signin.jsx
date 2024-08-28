import { Link, useNavigate } from "react-router-dom";
import { TouchableOpacity } from "react-native-web";
import axios from "axios";
import "../css/signin.css";
import { useState, useContext } from "react";
import { UserContext } from "../userContext";
function SignIn() {
  const { setUserName } = useContext(UserContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://walamin-server.onrender.com/users/login",
        {
          name,
          password,
        }
      );
      if (response.data.success) {
        console.log(response.data);
        setUserName(name);
        navigate("/home");
      } else {
        setError(response.data.error);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main class="page-center">
      <article class="sign-up">
        <h2 class="sign-up__title">Go Walamin Go Green!</h2>
        <p class="sign-up__subtitle">Sign in to your account to continue</p>
        <form class="sign-up-form form" onSubmit={handleSubmit}>
          <label class="form-label-wrapper">
            <p class="form-label">Name</p>
            <input
              class="form-input"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label class="form-label-wrapper">
            <p class="form-label">Password</p>
            <input
              class="form-input"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <a class="link-info forget-link" href="##">
            Forgot your password?
          </a>
          <label class="form-checkbox-wrapper">
            {error && <p style={{ color: "red" }}>{error}</p>}
          </label>
          <div>
            <TouchableOpacity>
              <button
                type="submit"
                class="form-btn primary-default-btn transparent-btn"
              >
                <span> Sign In</span>
              </button>
            </TouchableOpacity>
            <p>Or</p>
            <TouchableOpacity>
              <Link to="/signup">
                <button
                  onclick="location.href='mainpage.html'"
                  class="form-btn primary-default-btn transparent-btn"
                >
                  <span> Sign Up</span>
                </button>
              </Link>
            </TouchableOpacity>
          </div>
        </form>
      </article>
    </main>
  );
}

export default SignIn;

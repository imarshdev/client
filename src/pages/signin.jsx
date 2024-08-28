import { Link, useNavigate } from "react-router-dom";
import { TouchableOpacity } from "react-native-web";
import axios from "axios";
import "../css/signin.css";
import { useState, useContext } from "react";
import { UserContext } from "../userContext";
function SignIn() {
  const { setUserName } = useContext(UserContext);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://walamin-server.onrender.com/users/login",
        {
          name,
          token,
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
        <p class="sign-up__subtitle">Enter entry token</p>
        <form class="sign-up-form form" onSubmit={handleSubmit}>
          <label class="form-label-wrapper">
            <p class="form-label">Token</p>
            <input
              class="form-input"
              type="text"
              placeholder="Six Digit Token"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label class="form-label-wrapper">
            <p class="form-label">6 Digit token</p>
            <input
              class="form-input"
              type="number"
              inputMode="numeric"
              placeholder="Enter your 6 digit token"
              required
              value={token}
              onChange={(event) => setToken(event.target.value)}
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

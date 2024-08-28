import { Link, useNavigate } from "react-router-dom";
import { TouchableOpacity } from "react-native-web";
import axios from "axios";
import "../css/signin.css";
import { useState, useContext } from "react";
import { UserContext } from "../userContext";
import { BottomSheet } from "react-spring-bottom-sheet";
function SignIn() {
  const [open, setOpen] = useState(false);
  const dismis = () => {
    setOpen(false);
  };
  const { user, setUser } = useContext(UserContext);
  const [username, setusername] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        username,
        token,
      });
      if (response.data.success) {
        console.log(response.data);
        setUser({ ...user, username: username });
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
    <form
      onSubmit={handleSubmit}
      className="home"
      style={{
        boxSizing: "border-box",
        padding: "20px",
      }}
    >
      <h2>Signin</h2>
      <label class="form-label-wrapper">
        <p class="form-label">UserName:</p>
        <input
          class="form-input"
          type="text"
          value={username}
          onChange={(event) => setusername(event.target.value)}
          placeholder="Enter your name"
          required
        />
      </label>
      <label class="form-label-wrapper">
        <p class="form-label">6 digit token:</p>
        <input
          class="form-input"
          type="text"
          placeholder="Enter 6 digit token"
          required
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
      </label>
      <label class="form-checkbox-wrapper">
        {error && <p style={{ color: "red" }}>{error}</p>}
      </label>
      <button id="signup">
        <span style={{ padding: "6px", color: "black" }}>Sign in</span>
      </button>
      <p>Don't have an account, Sign up</p>
      <TouchableOpacity onPress={() => setOpen(true)} id="signup">
        <p>Sign up</p>
      </TouchableOpacity>
      <BottomSheet onDismiss={dismis} open={open}>
        <SignUP />
      </BottomSheet>
    </form>
  );
}

export default SignIn;

export function SignUP() {
  const { user, setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const history = useNavigate();
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users", {
        firstName,
        lastName,
        username,
        password,
        token,
      });
      console.log(response.data);
      setUser({ ...user, username: username });
      setUser({ ...user, firstName: firstName });
      setUser({ ...user, lastName: lastName });
      history("/home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="home"
      style={{ height: "80vh", boxSizing: "border-box", padding: "20px" }}
    >
      <h2>Signin</h2>
      {step === 1 && (
        <>
          <label class="form-label-wrapper">
            <p class="form-label">First Name:</p>
            <input
              class="form-input"
              type="text"
              placeholder="Enter your first name"
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
          <label class="form-label-wrapper">
            <p class="form-label">Last Name:</p>
            <input
              class="form-input"
              type="text"
              placeholder="Enter your last name"
              required
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
          <label class="form-label-wrapper">
            <p class="form-label">Preferred Username:</p>
            <input
              class="form-input"
              type="text"
              placeholder="Enter username"
              required
              value={username}
              onChange={(event) => setuserName(event.target.value)}
            />
          </label>
          <br />
          <TouchableOpacity onPress={nextStep} id="signup">
            <p>Next</p>
          </TouchableOpacity>
        </>
      )}
      {step === 2 && (
        <>
          <label class="form-label-wrapper">
            <p class="form-label">Password:</p>
            <input
              class="form-input"
              type="text"
              placeholder="Enter password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <label class="form-label-wrapper">
            <p class="form-label">6 digit login token:</p>
            <input
              class="form-input"
              type="text"
              placeholder="Enter 6 digit token"
              required
              value={token}
              onChange={(event) => setToken(event.target.value)}
            />
            <span style={{ textAlign: "end" }}>
              be sure to remeber your token !!
            </span>
          </label>
          <br />
          <button type="submit" id="signup">
            <span style={{ padding: "6px", color: "black" }}>Done</span>
          </button>
        </>
      )}
    </form>
  );
}

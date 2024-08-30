import { Link, useNavigate } from "react-router-dom";
import { TouchableOpacity } from "react-native-web";
import axios from "axios";
import "../css/signin.css";
import { useState, useContext } from "react";
import { UserContext } from "../userContext";
import { BottomSheet } from "react-spring-bottom-sheet";
function SignIn() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://walamin-server.onrender.com/users/login",
        {
          username,
          token,
        }
      );
      if (response.data.success) {
        setUser({ ...user, username });
        navigate("/home");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="home"
      style={{ boxSizing: "border-box", padding: "20px" }}
    >
      <h2>Signin</h2>
      <label className="form-label-wrapper">
        <p className="form-label">Username:</p>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your name"
          required
        />
      </label>
      <label className="form-label-wrapper">
        <p className="form-label">6 digit token:</p>
        <input
          className="form-input"
          type="text"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="Enter 6 digit token"
          required
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" id="signup">
        <span style={{ padding: "6px", color: "black" }}>Sign in</span>
      </button>
      <p>Don't have an account, Sign up</p>
      <TouchableOpacity onPress={() => setOpen(true)} id="signup">
        <p>Sign up</p>
      </TouchableOpacity>
      <BottomSheet onDismiss={() => setOpen(false)} open={open}>
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://walamin-server.onrender.com/users",
        {
          firstName,
          lastName,
          username,
          password,
          token,
        }
      );
      console.log(response.data);
      setUser({ ...user, username, firstName, lastName });
      navigate("/home");
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
      <h2>Sign up</h2>
      {step === 1 && (
        <>
          <label className="form-label-wrapper">
            <p className="form-label">First Name:</p>
            <input
              className="form-input"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Enter your first name"
              required
            />
          </label>
          <label className="form-label-wrapper">
            <p className="form-label">Last Name:</p>
            <input
              className="form-input"
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Enter your last name"
              required
            />
          </label>
          <label className="form-label-wrapper">
            <p className="form-label">Preferred Username:</p>
            <input
              className="form-input"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              required
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
          <label className="form-label-wrapper">
            <p className="form-label">Password:</p>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              required
            />
          </label>
          <label className="form-label-wrapper">
            <p className="form-label">6 digit login token:</p>
            <input
              className="form-input"
              type="text"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Enter 6 digit token"
              required
            />
            <span style={{ textAlign: "end" }}>
              Be sure to remember your token!!
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

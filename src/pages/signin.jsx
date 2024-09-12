import { Link, useNavigate } from "react-router-dom";
import { TouchableOpacity } from "react-native-web";
import axios from "axios";
import "../css/signin.css";
import { useState, useContext } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { UserContext } from "../../UserContext";
import { LoginContext } from "../../loggedin";
function SignIn() {
  const { user, setUser } = useContext(UserContext);
  const { setIsLoggedIn } = useContext(LoginContext);
  const [open, setOpen] = useState(false);
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
        setUser({ Username: username, Token: token, isLoggedIn: true });
        navigate("/");
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
      style={{
        boxSizing: "border-box",
        padding: "20px",
        justifyContent: "start",
        marginTop: "10vh",
        width: "100vw",
      }}
    >
      <h2>Signin</h2>
      <label className="form-label-wrapper">
        <p className="form-label">Username:</p>{" "}
        <div id="input-container">
          <input
            className="schedule-input"
            type="text"
            value={username}
            style={{ color: "black" }}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
      </label>
      <label className="form-label-wrapper">
        <p className="form-label">6 digit token:</p>{" "}
        <div id="input-container">
          <input
            className="schedule-input"
            type="number"
            inputMode="numeric"
            style={{ color: "black" }}
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="Enter 6 digit token"
            required
          />
        </div>
      </label>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <br />
      <button type="submit" id="signup">
        <span style={{ padding: "6px", color: "black" }}>Sign in</span>
      </button>
      <p>Don't have an account, Sign up</p>
      <TouchableOpacity onPress={() => setOpen(true)} id="signup">
        <p>Sign up</p>
      </TouchableOpacity>
      <BottomSheet
        snapPoints={({ maxHeight }) => [maxHeight]}
        onDismiss={() => setOpen(false)}
        open={open}
      >
        <SignUP />
      </BottomSheet>
    </form>
  );
}

export default SignIn;

export function SignUP() {
  const { user, setUser } = useContext(UserContext);
  const { setIsLoggedIn } = useContext(LoginContext);
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
      setUser({ Username: username, Token: token, isLoggedIn: true });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        boxSizing: "border-box",
        padding: "20px",
        justifyContent: "start",
        marginTop: "10vh",
      }}
    >
      <h2>Sign up</h2>
      {step === 1 && (
        <>
          <label className="form-label-wrapper">
            <p className="form-label">First Name:</p>{" "}
            <div id="input-container">
              <input
                className="schedule-input"
                type="text"
                value={firstName}
                style={{ color: "black" }}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Enter your first name"
                required
              />
            </div>
          </label>
          <label className="form-label-wrapper">
            <p className="form-label">Last Name:</p>{" "}
            <div id="input-container">
              <input
                className="schedule-input"
                type="text"
                value={lastName}
                style={{ color: "black" }}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Enter your last name"
                required
              />
            </div>
          </label>
          <label className="form-label-wrapper">
            <p className="form-label">Preferred Username:</p>{" "}
            <div id="input-container">
              <input
                className="schedule-input"
                type="text"
                value={username}
                style={{ color: "black" }}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
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
            <p className="form-label">Contact:</p>{" "}
            <div id="input-container">
              <input
                className="schedule-input"
                type="tel"
                value={password}
                style={{ color: "black" }}
                name="phone"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter contact"
                required
              />
            </div>
          </label>
          <label className="form-label-wrapper">
            <p className="form-label">6 digit login token:</p>{" "}
            <div id="input-container">
              <input
                className="schedule-input"
                type="number"
                inputMode="numeric"
                style={{ color: "black" }}
                value={token}
                onChange={(event) => setToken(event.target.value)}
                placeholder="Enter 6 digit token"
                required
              />
            </div>
            <br />
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

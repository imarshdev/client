import { Link } from "react-router-dom";
import "../css/signin.css";
import { TouchableOpacity } from "react-native-web";
function SignUp() {
  return (
    <main class="page-center">
      <article class="sign-up">
        <h2 class="sign-up__title">Get started</h2>
        <p class="sign-up__subtitle">
          Start the best possible user experience for you.
        </p>
        <form className="sign-up-form form">
          <label className="form-label-wrapper">
            <p className="form-label">Name</p>
            <input
              className="form-input"
              type="text"
              placeholder="Enter your name"
              required
            />
          </label>
          <label className="form-label-wrapper">
            <p className="form-label">Password</p>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              required
            />
          </label>
          <label className="form-checkbox-wrapper">
            <input className="form-checkbox" type="checkbox" required />
            <span className="form-checkbox-label">
              <span>Remember me next time</span>
            </span>
          </label>
          <TouchableOpacity>
            <button className="form-btn primary-default-btn transparent-btn">
              <span>Sign up</span>
            </button>
          </TouchableOpacity>
        </form>
      </article>
    </main>
  );
}


export default SignUp;

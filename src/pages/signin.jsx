import "../css/signin.css";
function SignIn() {
  return (
    <main class="page-center">
      <article class="sign-up">
        <h2 class="sign-up__title">Go Walamin Go Green!</h2>
        <p class="sign-up__subtitle">Sign in to your account to continue</p>
        <form class="sign-up-form form" action="" method="">
          <label class="form-label-wrapper">
            <p class="form-label">Email</p>
            <input
              class="form-input"
              type="email"
              placeholder="Enter your email"
              required
            />
          </label>
          <label class="form-label-wrapper">
            <p class="form-label">Password</p>
            <input
              class="form-input"
              type="password"
              placeholder="Enter your password"
              required
            />
          </label>
          <a class="link-info forget-link" href="##">
            Forgot your password?
          </a>
          <label class="form-checkbox-wrapper">
            <input class="form-checkbox" type="checkbox" required />
            <span class="form-checkbox-label">Remember me next time</span>
          </label>
          <button
            onclick="location.href='mainpage.html'"
            class="form-btn primary-default-btn transparent-btn"
          >
            Sign in
          </button>
          <br />
          <br />
          <a class="link-info forget-link" href="##">
            Don't have an account?
          </a>
          <br />
          <br />
          <button
            onclick="location.href='mainpage.html'"
            class="form-btn primary-default-btn transparent-btn"
          >
            Sign Up
          </button>
        </form>
      </article>
    </main>
  );
}

export default SignIn;

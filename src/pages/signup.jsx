import "../css/signin.css";
function SignUp() {
  return (
<main class="signup_page-center">
  <article class="sign-up">
    <h2 class="sign-up__title">Get started</h2>
    <p class="sign-up__subtitle">Start creating the best possible user experience for you customers</p>
    <form class="sign-up-form form" action="" method="">
      <label class="form-label-wrapper">
        <p class="form-label">Name</p>
        <input class="form-input" type="text" placeholder="Enter your name" required />
      </label>
      <label class="form-label-wrapper">
        <p class="form-label">Team</p>
        <input class="form-input" type="email" placeholder="Enter your Team name" required />
      </label>
      <label class="form-label-wrapper">
        <p class="form-label">Email</p>
        <input class="form-input" type="email" placeholder="Enter your email" required />
      </label>
      <label class="form-label-wrapper">
        <p class="form-label">Password</p>
        <input class="form-input" type="password" placeholder="Enter your password" required />
      </label>
      <label class="form-checkbox-wrapper">
        <input class="form-checkbox" type="checkbox" required />
        <span class="form-checkbox-label">Remember me next time</span>
      </label>
      <button onclick="location.href='mainpage.html'" class="form-btn primary-default-btn transparent-btn">Sign up</button> 
    </form>
  </article>
</main>
  );
}

export default SignUp;

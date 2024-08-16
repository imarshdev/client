import { Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import delivery from "../assets/delivery.png";
import ride from "../assets/ride.png";
import scheduled from "../assets/scheduled.png";
import "../css/signin.css";
import { useState } from "react";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native-web";
function SignUp() {
  return (
    <main class="signup_page-center">
      <article class="sign-up">
        <h2 class="sign-up__title">Get started</h2>
        <p class="sign-up__subtitle">
          Start creating the best possible user experience for you.
        </p>
        <form class="sign-up-form form" action="" method="">
          <label class="form-label-wrapper">
            <p class="form-label">Name</p>
            <input
              class="form-input"
              type="text"
              placeholder="Enter your name"
              required
            />
          </label>
          <label class="form-label-wrapper">
            <p class="form-label">Contact</p>
            <input
              class="form-input"
              type="tel"
              placeholder="Enter your Contact"
              required
            />
          </label>
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
          <label class="form-checkbox-wrapper">
            <input class="form-checkbox" type="checkbox" required />
            <span class="form-checkbox-label">
              <span>Remember me next time</span>
            </span>
          </label>
          <TouchableOpacity>
            <Link to="/home">
              <button class="form-btn primary-default-btn transparent-btn">
                <span>Sign up</span>
              </button>
            </Link>
          </TouchableOpacity>
        </form>
      </article>
    </main>
  );
}


export default SignUp;

import React, { useState } from "react";
import { validate, operator } from "bd-phone-number-validator";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

    ;

  const [formData, setFormData] = useState({
    name: "",    
    phoneOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;

    
    if(!emailRegex.test(formData.phoneOrEmail) && !phoneRegex.test(formData.phoneOrEmail)) {
     toast.error("Please enter a valid email or Bangladeshi phone number.");
      return;
    }


    if (isSignUp) {
      console.log("Sign Up Data:", formData);
     console.log("register data sumited")
    } else {
      console.log("Sign In Data:", {
        phoneOrEmail: formData.phoneOrEmail,        
        password: formData.password,
      });
      console.log("login data sumited");
    }

    console.log(formData)
  };

  const toggleAuth = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
    setFormData({ name: "", phoneOrEmail: "", password: "" });
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div
        className="card border-0 shadow-lg overflow-hidden"
        style={{ maxWidth: "900px", width: "100%", borderRadius: "20px" }}
      >
        <div className="row g-0">
          {/* Left Side */}
          <div className="col-md-5 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5 bg-primary">
            <h1 className="fw-bold mb-3">
              {isSignUp ? "Join Us!" : "Welcome Back!"}
            </h1>

            <p className="text-center mb-4">
              {isSignUp
                ? "Create an account and start your journey with us."
                : "Sign in to access your account and continue where you left off."}
            </p>

            <button
              type="button"
              className="btn btn-outline-light rounded-pill px-5"
              onClick={toggleAuth}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>

          {/* Right Side */}
          <div className="col-md-7 p-4 p-md-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark">
                {isSignUp ? "Create Account" : "Sign In"}
              </h2>
              <p className="text-secondary">
                {isSignUp
                  ? "Fill in your details to register"
                  : "Enter your account details"}
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="d-flex bg-light rounded-pill p-1 mb-4">
              <button
                type="button"
                className={`btn rounded-pill flex-fill ${
                  !isSignUp ? "btn-primary" : "btn-light"
                }`}
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>

              <button
                type="button"
                className={`btn rounded-pill flex-fill ${
                  isSignUp ? "btn-primary" : "btn-light"
                }`}
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              {isSignUp && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Phone/Email Address</label>
                <input
                  type="text"
                  name="phoneOrEmail"
                  className="form-control form-control-lg"
                  placeholder="Enter your phone/email"
                  value={formData.phoneOrEmail}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>

                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete={
                      isSignUp ? "new-password" : "current-password"
                    }
                    minLength={6}
                    required
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              {!isSignUp && (
                <div className="text-end mb-3">
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 rounded-pill mt-2"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>

            {/* Bottom Toggle */}
            <p className="text-center text-secondary mt-4 mb-0">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}

              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none fw-semibold"
                onClick={toggleAuth}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  ;
};

export default Authentication;

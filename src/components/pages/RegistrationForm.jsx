import { useForm } from "react-hook-form";
import { unionNames, wardNumbers } from "../../utils/helper";



const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onTouched", // Validates fields when user clicks away
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Registered Data:", data);
    alert("Registration Successful!");
    reset();
  };

  // Watch password field to validate confirm password match
  const password = watch("password");

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm p-4">
              <h2 className="text-center mb-4 fw-bold text-primary">
                Registration Form
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                    placeholder="আপনার নাম লিখুন"
                    {...register("fullName", {
                      required: "Full name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">
                      {errors.fullName.message}
                    </div>
                  )}
                </div>
                  {/* choose  */}
                 <div className="mb-3">
                <label className="form-label fw-semibold">ইউনিয়ন নির্বাচন করুন</label>
                <select
                  className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                  {...register("union", { required: "Please select your union" })}
                >
                  {/* <option value="">Choose a union...</option> */}
                  {
                    unionNames.map((item, index) => (
                      <option key={index} value={item}> {item}</option>
                    ))
                  }
                  
                </select>
                {errors.union && <div className="invalid-feedback">{errors.union.message}</div>}
              </div>
                  {/* choose  */}
                 <div className="mb-3">
                <label className="form-label fw-semibold">ওয়ার্ড নং নির্বাচন করুন</label>
                <select
                  className={`form-select ${errors.ward ? 'is-invalid' : ''}`}
                  {...register("ward", { required: "Please select your ward" })}
                >
                  {/* <option value="">Choose a ward...</option> */}
                  {
                    wardNumbers.map((item, index) => (
                      <option key={index} value={item}> {item}</option>
                    ))
                  }
                </select>
                {errors.ward && <div className="invalid-feedback">{errors.ward.message}</div>}
              </div>
                  {/* choose  */}
                 <div className="mb-3">
                <label className="form-label fw-semibold">Country</label>
                <select
                  className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                  {...register("country", { required: "Please select your country" })}
                >
                  <option value="">Choose a country...</option>
                  <option value="BD">Bangladesh</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                </select>
                {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
              </div>
                  {/* choose  */}
                 <div className="mb-3">
                <label className="form-label fw-semibold">Country</label>
                <select
                  className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                  {...register("country", { required: "Please select your country" })}
                >
                  <option value="">Choose a country...</option>
                  <option value="BD">Bangladesh</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                </select>
                {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
              </div>
                  {/* choose  */}
                 <div className="mb-3">
                <label className="form-label fw-semibold">Country</label>
                <select
                  className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                  {...register("country", { required: "Please select your country" })}
                >
                  <option value="">Choose a country...</option>
                  <option value="BD">Bangladesh</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                </select>
                {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
              </div>
                  {/* choose  */}
                 <div className="mb-3">
                <label className="form-label fw-semibold">Country</label>
                <select
                  className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                  {...register("country", { required: "Please select your country" })}
                >
                  <option value="">Choose a country...</option>
                  <option value="BD">Bangladesh</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                </select>
                {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
              </div>
                  {/* choose  */}
                 <div className="mb-3">
                <label className="form-label fw-semibold">Country</label>
                <select
                  className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                  {...register("country", { required: "Please select your country" })}
                >
                  <option value="">Choose a country...</option>
                  <option value="BD">Bangladesh</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                </select>
                {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
              </div>

                {/* Email Address */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Phone/Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="আপনার মোবাইল অথবা ই-মেইল দিন"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    placeholder="••••••••"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className={`form-check-input ${errors.terms ? "is-invalid" : ""}`}
                    id="terms"
                    {...register("terms", {
                      required: "You must accept the terms",
                    })}
                  />
                  <label
                    className="form-check-label small text-muted"
                    htmlFor="terms"
                  >
                    I agree to the Terms & Conditions
                  </label>
                  {errors.terms && (
                    <div className="invalid-feedback d-block">
                      {errors.terms.message}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                      <span>Registering...</span>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

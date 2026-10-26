import { useState } from "react";
import { useForm } from "react-hook-form";
import locations from "../../data/bangladeshLocations.json";
import { AxiosInstance } from "./../../utils/axiosInstance";
import { toast } from 'react-toastify';
import { userStatus } from "../../utils/helper";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      upazilaName: "",
      union: "",
      ward: "",
      village: "",
    }, // Validates fields when user clicks away
  });

  // Watch selected values
  const upazilaName = watch("upazilaName");
  const union = watch("union");
  const ward = watch("ward");

  // Get dependent data
  const selectedUpazila = locations.find(
    (item) => item.upazilaName === upazilaName,
  );

  const unions = selectedUpazila?.unions ?? [];

  const selectedUnion = unions.find((item) => item.name === union);

  const wards = selectedUnion?.wards ?? [];

  const selectedWard = wards.find((item) => item.name === ward);

  const villages = selectedWard?.villages ?? [];

  // Reset child fields
  const handleUpazilaChange = () => {
    setValue("union", "", { shouldValidate: true });
    setValue("ward", "", { shouldValidate: true });
    setValue("village", "", { shouldValidate: true });
  };

  const handleUnionChange = () => {
    setValue("ward", "", { shouldValidate: true });
    setValue("village", "", { shouldValidate: true });
  };

  const handleWardChange = () => {
    setValue("village", "", { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      const res = await AxiosInstance.post("/auth/signup", data);
      console.log(res.data)
      toast.success(res.data.message)
       reset();
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Backend Error Message:", error.response.data.message);
       toast.error(error.response.data.message);
      } else {
        console.log("Something else went wrong:", error.message);
      }
    }
    
   
  };



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
                  <label className="form-label fw-semibold">আপনার নাম</label>
                  <input
                    type="text"
                    className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                    placeholder="আপনার নাম লিখুন"
                    {...register("fullname", {
                      required: "আপনার নাম অবশ্যই দিতে হবে",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.fullname && (
                    <div className="invalid-feedback">
                      {errors.fullname.message}
                    </div>
                  )}
                </div>

                {/* জেলা নির্বাচন */}

                <div className="mb-3">
                  <label className="form-label fw-semibold">জেলা</label>
                  <input
                    type="text"
                    defaultValue="কুমিল্লা"
                    className={`form-control ${errors.district ? "is-invalid" : ""}`}
                    placeholder="আপনার জেলার নাম লিখুন"
                    {...register("district", {
                      required: "আপনার নাম অবশ্যই দিতে হবে",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.district && (
                    <div className="invalid-feedback">
                      {errors.district.message}
                    </div>
                  )}
                </div>

                {/* Upazila selection */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">উপজেলা</label>

                  <select
                    className="form-select"
                    {...register("upazilaName", {
                      required: "আপনার উপজেলা নির্বাচন করতে হবে",
                      onChange: handleUpazilaChange,
                    })}
                  >
                    <option value="">উপজেলা নির্বাচন করুন</option>

                    {locations.map((item) => (
                      <option key={item.id} value={item.upazilaName}>
                        {item.upazilaName}
                      </option>
                    ))}
                  </select>

                  {errors.upazila && (
                    <small className="text-danger">
                      {errors.upazila.message}
                    </small>
                  )}
                </div>

                {/* Union */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">ইউনিয়ন</label>

                  <select
                    className="form-select"
                    disabled={!upazilaName}
                    {...register("union", {
                      required: "আপনার ইউনিয়ন নির্বাচন করতে হবে",
                      onChange: handleUnionChange,
                    })}
                  >
                    <option value="">ইউনিয়ন নির্বাচন করুন</option>

                    {unions.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  {errors.union && (
                    <small className="text-danger">
                      {errors.union.message}
                    </small>
                  )}
                </div>

                {/* Ward */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    ওয়ার্ড নির্বাচন
                  </label>

                  <select
                    className="form-select"
                    disabled={!union}
                    {...register("ward", {
                      required: "আপনার ওয়ার্ড নিবাচন করতে হবে",
                      onChange: handleWardChange,
                    })}
                  >
                    <option value="">ওয়ার্ড নির্বাচন করুন</option>

                    {wards.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  {errors.ward && (
                    <small className="text-danger">{errors.ward.message}</small>
                  )}
                </div>

                {/* Village */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">গ্রাম</label>

                  <select
                    className="form-select"
                    disabled={!ward}
                    {...register("village", {
                      required: "আপনার গ্রাম নির্বাচন করতে হবে",
                    })}
                  >
                    <option value="">গ্রাম নির্বাচন করুন</option>

                    {villages.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  {errors.village && (
                    <small className="text-danger">
                      {errors.village.message}
                    </small>
                  )}
                </div>

                {/* মোবাইল নাম্বার */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    মোবাইল নাম্বার
                  </label>
                  <input
                    type="phone"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="আপনার মোবাইল নম্বর দিন"
                    {...register("phone", {
                      required: "মোবাইল নাম্বার অবশ্যই দিতে হবে",
                      pattern: {
                        value: /^(\+88)?01[3-9]\d{8}$/,
                        message: "আপনার মোবাইল নম্বর সঠিক নয় ❌",
                      },
                    })}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">
                      {errors.phone.message}
                    </div>
                  )}
                </div>

                {/* মুরীদ না মোহিব্বীন */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    নির্বাচন করুন
                  </label>

                  <select
                    className="form-select"
                    {...register("position", {
                      required: "আপনার অবস্থান নির্বাচন করুন",
                    })}
                  >
                    <option value="">আপনার অবস্থা নির্বাচন করুন</option>

                    {userStatus.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {errors.position && (
                    <small className="text-danger">
                      {errors.position.message}
                    </small>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="flex justify-around">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="••••••••"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* Confirm Password
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
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
                </div> */}

                {/* Terms and Conditions */}
                {/* <div className="mb-4 form-check">
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
                </div> */}

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
                    "Register"
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

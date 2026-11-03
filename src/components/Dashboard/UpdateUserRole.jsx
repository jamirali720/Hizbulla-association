import { useEffect, useState } from "react";
import { AxiosInstance } from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// Example User Object structure

// Available Roles in your application
const AVAILABLE_ROLES = [
  { name: "ইউজার", value: "user" },
  { name: "এ্যাডমিন", value: "admin" },
  { name: "মডারেটর", value: "moderator" },
  { name: "এ্র্যাডিটর", value: "editor" },
];

const UpdateUserRole = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchedUser = async () => {
      const res = await AxiosInstance.get(`/auth/profile/${userId}`);
      console.log(res);
      if (res.data) {
        setUser(res.data.data);
      }
    };

    fetchedUser();
  }, [userId]);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({ mode: "onTouched" });
  console.log(userId);

  // Handle API Submission

  const onSubmit = async (data) => {
    try {
      const res = await AxiosInstance.put(`/auth/update-role/${userId}`, data);

      toast.success(res.data.message, { position: "bottom-center" });
      navigate("/dashboard/user-management");
      reset();
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Backend Error Message:", error.response.data.message);
        toast.error(error.response.data.message, { position: "bottom-center" });
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
                ইউজার রোল আপডেট করুন
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Union */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    এই {user?.position} একজন ‍<strong> {user?.role} </strong>
                  </label>

                  <select
                    className="form-select"
                    defaultValue={user?.role}
                    {...register("role")}
                  >
                    <option value="">ইউজার রোল নির্বাচন করুন</option>

                    {AVAILABLE_ROLES.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </select>
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
                      <span>সংশোধন হচ্ছে...</span>
                    </>
                  ) : (
                    "সংশোধন করুন"
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

export default UpdateUserRole;

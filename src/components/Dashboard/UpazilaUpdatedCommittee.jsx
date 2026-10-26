import { useForm } from "react-hook-form";

import { AxiosInstance } from "./../../utils/axiosInstance";
import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import { committeePosts } from "../../utils/helper";

const UpazilaUpdatedCommittee = () => {
  const { committeeId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      upazila: "",
      union: "",
      ward: "",
      village: "",
    }, // Validates fields when user clicks away
  });

  const onSubmit = async (data) => {
    try {
      const res = await AxiosInstance.put(`/upazila/${committeeId}`, data);

      toast.success(res.data.message);
      navigate("/dashboard/committees");
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
                উপজেলা কমিটি সংশোধন
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* designation update */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    সংগঠনের পদবী{" "}
                  </label>

                  <select className="form-select" {...register("position")}>
                    <option value="">সংগঠনের পদবী নির্বাচন করুন </option>

                    {committeePosts.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Union */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    স্ট্যাটাস নির্বাচন
                  </label>

                  <select className="form-select" {...register("status")}>
                    <option value="">স্ট্যাটাস নির্বাচন করুন</option>

                    <option key="" value="active">
                      Active
                    </option>
                    <option key="" value="inActive">
                      InActive
                    </option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    ক্রমধারা/সিরিয়াল
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.sorting ? "is-invalid" : ""}`}
                    placeholder="Enter sequence value"
                    {...register("sorting")}
                  />
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

export default UpazilaUpdatedCommittee;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import locations from "../../data/bangladeshLocations.json";
import { AxiosInstance } from "./../../utils/axiosInstance";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { committeePosts } from "../../utils/helper";

const UpdatedCommittee = () => {
  const { committeeId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const refreshList = async () => {
      const resp = await AxiosInstance.get(`/committee/profile/${committeeId}`);

      if (resp.data) {
        setUser(resp.data.data);
      }
    };

    refreshList();
  }, [committeeId]);

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
      upazila: "",
      union: "",
      ward: "",
      village: "",
    }, // Validates fields when user clicks away
  });

  // Watch selected values
  const upazila = watch("upazila");
  const union = watch("union");

  // Get dependent data
  const selectedUpazila = locations.find((item) => item.name === upazila);

  const unions = selectedUpazila?.unions ?? [];

  const selectedUnion = unions.find((item) => item.name === union);

  const wards = selectedUnion?.wards ?? [];

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
      const res = await AxiosInstance.put(
        `/committee/update-committee/${committeeId}`,
        data,
      );

      toast.success(res.data.message);
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
                প্রয়োজনীয় অংশ সংশোধন করুন
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* জেলা নির্বাচন */}

                <div className="mb-3">
                  <label className="form-label fw-semibold">জেলা</label>
                  <input
                    type="text"
                    defaultValue={user?.district}
                    className={`form-control ${errors.district ? "is-invalid" : ""}`}
                    placeholder="আপনার জেলার নাম লিখুন"
                    {...register("district", {
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                  />
                </div>
                {/* designation update */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    সংগঠনের পদবী{" "}
                  </label>

                  <select className="form-select" {...register("designation")}>
                    <option value="">সংগঠনের পদবী নির্বাচন করুন </option>

                    {committeePosts.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                {/* committe level update */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    সংগঠনের পর্যায়
                  </label>

                  <select
                    className="form-select"
                    {...register("committeeLevel")}
                  >
                    <option value="">সংগঠনের পর্যায় নির্বাচন করুন </option>

                    <option key="" value="উপজেলা">
                      উপজেলা{" "}
                    </option>
                    <option key="" value="ইউনিয়ন">
                      ইউনিয়ন
                    </option>
                    <option key="" value="ওয়ার্ড">
                      ওয়ার্ড
                    </option>
                  </select>
                </div>
                {/* Upazila selection */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    উপজেলা নির্বাচন
                  </label>

                  <select
                    className="form-select"
                    {...register("upazila", {
                      onChange: handleUpazilaChange,
                    })}
                  >
                    <option value="">উপজেলা নির্বাচন করুন</option>

                    {locations.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Union */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    ইউনিয়ন পর্যায়
                  </label>

                  <select
                    className="form-select"
                    disabled={!upazila}
                    {...register("union", {
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

export default UpdatedCommittee;

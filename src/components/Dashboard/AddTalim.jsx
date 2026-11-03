import { useForm } from "react-hook-form";
import locations from "../../data/bangladeshLocations.json";
import { AxiosInstance } from "./../../utils/axiosInstance";
import { toast } from "react-toastify";


const AddTalim = () => {
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
      union: "",
      ward: "",
      village: "",
      masjid: "",
    },
  });

  const union = watch("union");
  const ward = watch("ward");

  // Get dependent data
  const selectedUpazila = locations.find((item) => item.upazilaId === "titas");

  const unions = selectedUpazila?.unions ?? [];

  const selectedUnion = unions.find((item) => item.name === union);

  const wards = selectedUnion?.wards ?? [];

  const selectedWard = wards.find((item) => item.name === ward);

  const villages = selectedWard?.villages ?? [];

  const handleUnionChange = () => {
    setValue("ward", "", { shouldValidate: true });
    setValue("village", "", { shouldValidate: true });
  };

  const handleWardChange = () => {
    setValue("village", "", { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    
    const formData = new FormData();
    formData.append("upazila", "তিতাস উপজেলা");
    // ফর্মের সব ডেটা loop করে FormData-তে যোগ করুন
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    try {
      const res = await AxiosInstance.post("/talim", formData);
      toast.success(res.data.message, { position: "bottom-center" });
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
                তা’লিম যোগ করুন
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                  <label className="form-label fw-semibold">ইউনিয়নের নাম</label>

                  <select
                    className="form-select"
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
                  <label className="form-label fw-semibold">ওয়ার্ডের নাম</label>

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
                  <label className="form-label fw-semibold"> গ্রামের নাম</label>

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
                {/* masjid or mohallar name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    মসজিদ বা মহল্লার নাম
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                    placeholder="মসজিদ বা মহল্লার  নাম লিখুন"
                    {...register("masjid", {
                      required: "মসজিদ বা মহল্লার  নাম অবশ্যই দিতে হবে",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.masjid && (
                    <div className="invalid-feedback">
                      {errors.masjid.message}
                    </div>
                  )}
                </div>

                {/* date picker */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    তা’লিমের তারিখ
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                    {...register("date")}
                  />
                  {errors.date && (
                    <div className="invalid-feedback">
                      {errors.date.message}
                    </div>
                  )}
                </div>

                {/* মোবাইল নাম্বার */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    আয়োজকের মোবাইল নাম্বার
                  </label>
                  <input
                    type="phone"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder=" আয়োজকের মোবাইল নম্বর দিন"
                    {...register("phone", {
                      required: " আয়োজকের মোবাইল অবশ্যই দিতে হবে",
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
                      <span>Adding Talim...</span>
                    </>
                  ) : (
                    "তা’লিম যোগ করুন"
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

export default AddTalim;

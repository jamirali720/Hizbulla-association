import { useForm } from "react-hook-form";
import locations from "../../data/bangladeshLocations.json";
import { AxiosInstance } from "./../../utils/axiosInstance";
import { toast } from "react-toastify";
import { committeeNames, committeePosts } from "../../utils/helper";
import { useParams } from "react-router-dom";

const AddCommittee = () => {
  const { committeeId } = useParams();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      upazilaName: "",
      upazilaId: "",
      committeeName: "",
      position: "",
      committeeType: "",
    },
  });

  const sUpazila = locations.filter(
    (item) => item.upazilaId && item.upazilaName,
  );

   const selectedCommittee = watch("committeeType");
  const onSubmit = async (data) => {
    const fd = new FormData();

    Object.keys(data).forEach((key) => {
      fd.append(key, data[key]);
    });
    sUpazila.forEach(
      (upz) => (
        fd.append("upazilaId", upz.upazilaId),
        fd.append("upazilaName", upz.upazilaName)
      ),
    );

    const ds = Object.fromEntries(fd); //extracts form data
    console.log(ds);

     const routeUrl = `/${data.committeeType}`;
    try {
      const res = await AxiosInstance.post("/upazilas", fd);

      // console.log(res.data);
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
    <div className="container flex justify-center">
      <div className="card shadow-sm p-4 w-full h-full md:w-1/3">
        <h2 className="text-center mb-4 fw-bold text-primary">
          উপজেলা কমিটি গঠন
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold">সংগঠনের পদবী</label>

            <select
              className="form-select"
              {...register("position", {
                required: "আপনার গ্রাম নির্বাচন করতে হবে",
              })}
            >
              <option value="">পদবী নির্বাচন করুন</option>

              {committeePosts.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {errors.position && (
              <small className="text-danger">{errors.position.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              কমিটির নাম নির্বাচন
            </label>

            <select className="form-select" {...register("committeeName")}>
              <option value="">কমিটির নাম নির্বাচন করুন</option>

              {committeeNames.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {errors.committeeName && (
              <small className="text-danger">
                {errors.committeeName.message}
              </small>
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
              "Add Committee"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCommittee;

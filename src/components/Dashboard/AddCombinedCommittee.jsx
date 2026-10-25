import { useForm } from "react-hook-form";
import { committeePosts } from "../../utils/helper.js";
import { useParams } from "react-router-dom";
import locations from "../../data/bangladeshLocations.json";
import { useState } from "react";
import { AxiosInstance } from "../../utils/axiosInstance.js";
import { Bounce, toast } from "react-toastify";
const AddCombinedCommittee = () => {
  // ১. React Hook Form ইনিশিয়ালাইজ করুন
  const { committeeId } = useParams();
  const [unionId, setUnionId] = useState(null);
  const [wardId, setWardId] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      committeeType: "", // শুরুর ভ্যালু খালি থাকবে
    },
  });

  // Get dependent data
  const selectedUpazila = locations.find((item) => item);

  const unions = selectedUpazila?.unions ?? [];

  const selectedUnion = unions.find((item) => item);

  const wards = selectedUnion?.wards ?? [];

  // ২. 'committeeType' ড্রপডাউনের ভ্যালু রিয়েল-টাইমে ট্র্যাক করার জন্য watch() ব্যবহার করুন
  const selectedCommittee = watch("committeeType");
  const committeeName =
    selectedCommittee === "upazila"
      ? "তিতাস উপজেলা কমিটি"
      : selectedCommittee === "union"
        ? "ইউনিয়ন কমিটি"
        : "ওয়ার্ড কমিটি";

  const handleUnionIdChange = (e) => {
    const targetOptionId = e.target.options[e.target.selectedIndex].id;
    setUnionId(targetOptionId);
  };
  const handleWardIdChange = (e) => {
    const targetOptionId = e.target.options[e.target.selectedIndex].id;
    setWardId(targetOptionId);
  };

  // ৩. ফর্ম সাবমিট হ্যান্ডলার
  const onSubmit = async (data) => {
    const upazilaData = new FormData();
    upazilaData.append("upazilaId", "titas");
    upazilaData.append("upazilaName", "তিতাস");
    upazilaData.append("committeeName", committeeName);
    upazilaData.append("position", data.position);
    upazilaData.append("user", committeeId);

    const unionData = new FormData();
    unionData.append("upazilaCommittee", "6adc5ac23f4cdb6df8871bb2");
    unionData.append("unionId", unionId);
    unionData.append("unionName", data.union);
    unionData.append("committeeName", `${data.union} ${committeeName}`);
    unionData.append("positon", data.position);
    unionData.append("user", committeeId);

    const wardData = new FormData();
    wardData.append("unionCommittee", "6adc5ac23f4cdb6df8871bb2");
    wardData.append("wardId", wardId);
    wardData.append("wardName", data.ward);
    wardData.append(
      "committeeName",
      `${data.ward?.split("-")[1]} নং ${committeeName}`,
    );
    wardData.append("positon", data.position);
    wardData.append("user", committeeId);

    const sendingData =
      selectedCommittee === "upazila"
        ? upazilaData
        : selectedCommittee === "union"
          ? unionData
          : wardData;
    // ফর্মের সব ডেটা loop করে FormData-তে যোগ করুন
    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });

    // const ds = Object.fromEntries(sendingData); //extracts form data
    // console.log(ds);

    try {
      const response = await AxiosInstance.post(
        `/${data.committeeType}`,
        sendingData,
      );

      console.log(response.data);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        transition: Bounce,
      });
      reset();
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Backend Error Message:", error.response.data.message);        
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          transition: Bounce,
        });
      } else {
        console.log("Something else went wrong:", error.message);
      }
    }
  };

  return (
    <div className="container flex justify-center">
      <div className="card shadow-sm p-4 w-full h-full md:w-1/3">
        <h2 className="text-center mb-4 fw-bold text-primary">
          কমিটি ব্যবস্থাপনা
        </h2>

        {/* পুরো পেজটিকে একটিমাত্র ফর্মে নিয়ে আসা হয়েছে */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* ড্রপডাউন সিলেক্ট বক্স */}
          <div>
            <label className="form-label fw-semibold">
              কমিটি টাইপ নির্বাচন করুন:
            </label>
            <select
              {...register("committeeType", {
                required: "একটি কমিটি সিলেক্ট করা বাধ্যতামূলক",
              })}
              className="w-full p-2 my-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
            >
              <option value="">-- সিলেক্ট করুন --</option>
              <option value="upazila">উপজেলা কমিটি</option>
              <option value="union">ইউনিয়ন কমিটি</option>
              <option value="ward">ওয়ার্ড কমিটি</option>
            </select>
            {errors.committeeType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.committeeType.message}
              </p>
            )}
          </div>

          {/* ৪. কন্ডিশনাল রেন্ডারিং (ড্রপডাউনের ভ্যালুর ওপর ভিত্তি করে) */}

          {/* উপজেলা কমিটি ফিল্ডস */}
          {selectedCommittee === "upazila" && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-blue-800">
                  Upazila Committee Details
                </h3>
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
                  <small className="text-danger">
                    {errors.position.message}
                  </small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  কমিটির নাম নির্বাচন
                </label>

                <select className="form-select" {...register("committeeName")}>
                  <option value="">কমিটির নাম নির্বাচন করুন</option>
                  <option value="তিতাস উপজেলা কমিটি">তিতাস উপজেলা কমিটি</option>
                </select>

                {errors.committeeName && (
                  <small className="text-danger">
                    {errors.committeeName.message}
                  </small>
                )}
              </div>
            </div>
          )}

          {/* ইউনিয়ন কমিটি ফিল্ডস */}
          {selectedCommittee === "union" && (
            <div className="p-4 bg-green-50 rounded-lg border border-blue-200 space-y-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-blue-800">
                  Upazila Committee Details
                </h3>
                <label className="form-label fw-semibold">সংগঠনের পদবী</label>
                <select
                  className="form-select"
                  {...register("position", {
                    required: "সংগঠনের পদবী নির্বাচন করতে হবে",
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
                  <small className="text-danger">
                    {errors.position.message}
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">ইউনিয়ন</label>

                <select
                  className="form-select"
                  {...register("union", {
                    required: "আপনার ইউনিয়ন নির্বাচন করতে হবে",
                    onChange: handleUnionIdChange,
                  })}
                >
                  <option value="">ইউনিয়ন নির্বাচন করুন</option>

                  {unions.map((item) => (
                    <option key={item.id} id={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>

                {errors.union && (
                  <small className="text-danger">{errors.union.message}</small>
                )}
              </div>
            </div>
          )}

          {/* ওয়ার্ড কমিটি ফিল্ডস */}
          {selectedCommittee === "ward" && (
            <div className="p-4 bg-pink-50 rounded-lg border border-blue-200 space-y-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-blue-800">
                  Upazila Committee Details
                </h3>
                <label className="form-label fw-semibold">সংগঠনের পদবী</label>
                <select
                  className="form-select"
                  {...register("position", {
                    required: "সংগঠনের পদবী নির্বাচন করতে হবে",
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
                  <small className="text-danger">
                    {errors.position.message}
                  </small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  কমিটির নাম নির্বাচন
                </label>

                <select className="form-select" {...register("committeeName")}>
                  <option value="">কমিটির নাম নির্বাচন করুন</option>
                  <option value="ওয়ার্ড কমিটি">ওয়ার্ড কমিটি</option>
                </select>

                {errors.committeeName && (
                  <small className="text-danger">
                    {errors.committeeName.message}
                  </small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">ওয়ার্ড</label>

                <select
                  className="form-select"
                  {...register("ward", {
                    required: "ওয়ার্ড নির্বাচন করতে হবে",
                    onChange: handleWardIdChange,
                  })}
                >
                  <option value="">ওয়ার্ড নির্বাচন করুন</option>

                  {wards.map((item) => (
                    <option key={item.id} id={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>

                {errors.ward && (
                  <small className="text-danger">{errors.ward.message}</small>
                )}
              </div>
            </div>
          )}

          {/* সাবমিট বাটন (কমিটি সিলেক্ট করা হলেই কেবল এটি দেখাবে) */}
          {selectedCommittee && (
            <button
              type="submit"
              className="w-full bg-slate-800 text-white p-2 rounded-md hover:bg-slate-900 transition font-medium"
            >
              কমিটি তথ্য সাবমিট করুন
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCombinedCommittee;

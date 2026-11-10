const userRoles = ["অ্যাডমিন", "ইউজার"];
export const userStatus = [
  { value: "মুরীদ", name: "একজন মুরীদ" },
  { value: "মুহিব্বীন", name: "একজন মুহিব্বীন" },
];
const committeePosts = [
  "সভাপতি",
  "সহ-সভাপতি",
  "সাধারণ সম্পাদক",
  "যুগ্ম-সাধারণ সম্পাদক",
  "সহ-সাধারণ_সম্পাদক",
  "তা’লিমে তরীকত সম্পাদক",
  "সিঃ সহ-তা’লিমে তরীকত সম্পাদক",
  "সহ-তা’লিমে তরীকত সম্পাদক",
  "সাংগঠনিক সম্পাদক",
  "সহকারী সাংগঠনিক সম্পাদক",
  "গবেষনা ও প্রকাশনা সম্পাদক",
  "সহ-গবেষনা ও প্রকাশনা সম্পাদক",
  "প্রচার সম্পাদক",
  "সহকারী প্রচার সম্পাদক",
  "শিক্ষা ও সাংস্কৃতিক সম্পাদক",
  "সহ-শিক্ষা ও সাংস্কৃতিক সম্পাদক",
  "সেবা ও সমাজ কল্যাণ সম্পাদক",
  "সহ-সেবা ও সমাজ কল্যাণ সম্পাদক",
  "অর্থ সম্পাদক",
  "সহ-অর্থ সম্পাদক",
  "সহকারী অর্থ সম্পাদক",
  "অডিটর",
  "সহ-অডিটর",
  "দপ্তর সম্পাদক",
  "সহকারী দপ্তর সম্পদক",
  "সদস্য",
];

const unionNames = [
  "সাতানী",
  "জগতপুর",
  "বলরামপুর",
  "কড়িকান্দি",
  "কলাকান্দি",
  "ভিটিকান্দি",
  "নারান্দিয়া",
  "জিয়ারকান্দি",
  "মজিদপুর",
];

const wardNumbers = [
  "ওয়ার্ড-এক",
  "ওয়ার্ড-দুই",
  "ওয়ার্ড-তিন",
  "ওয়ার্ড-চার",
  "ওয়ার্ড-পাঁচ",
  "ওয়ার্ড-ছয়",
  "ওয়ার্ড-সাত",
  "ওয়ার্ড-আট",
  "ওয়ার্ড-নয়",
];
const committeeLevels = ["উপজেলা", "ইউনিয়ন", "ওয়ার্ড"];
const committeeNames = ["তিতাস উপজেলা কমিটি", "ইউনিয়ন কমিটি", "ওয়ার্ড কমিটি"];
const committeeType = [
  { id: "upazila", name: "তিতাস উপজেলা কমিটি" },
  { id: "union", name: "ইউনিয়ন কমিটি" },
  { id: "ward", name: "ওয়ার্ড কমিটি" },
];

export {
  committeePosts,
  unionNames,
  userRoles,
  committeeType,
  wardNumbers,
  committeeNames,
  committeeLevels,
};

export const dateFormate = (isoString) => {
  const dateObj = new Date(isoString);
  const formattedDate = new Intl.DateTimeFormat("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(dateObj);

  return formattedDate;
};

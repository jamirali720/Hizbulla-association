import { useState } from 'react'

import './App.css'
import { validate, operator } from 'bd-phone-number-validator';
import MainLayout from './layout/MainLayout';

function App() {
  const [inputNumber, setInputNumber] = useState("");
  const [phoneInfo, setPhoneInfo] = useState(null);

  const handleCheck = (e) => {
    const val = e.target.value;
    setInputNumber(val);
    const valid = validate(val);
    const details = operator(val);
    setPhoneInfo({ valid, details });
  };

  return (
    // <>
    //   <div>
    //     <input
    //       type="text"
    //       value={inputNumber}
    //       onChange={handleCheck}
    //       placeholder="আপনার মোবাইল নম্বর লিখুন"
    //     />
    //     {phoneInfo && (
    //       <div>
    //         <p style={{ color: phoneInfo.valid ? 'green' : 'red' }}>
    //           Status:{" "}
    //           {phoneInfo.valid
    //             ? "আপনার মোবাইল নম্বর সঠিক ✅"
    //             : "আপনার মোবাইল নম্বর সঠিক নয় ❌"}
    //         </p>
    //         {phoneInfo.valid && (
    //           <p> {phoneInfo.details.operator} Mobile Number </p>
    //         )}
    //       </div>
    //     )}
    //   </div>
    // </>

     <MainLayout/>
  );
}

export default App



"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [formValues, setFormValues] = useState({ day: "", month: "", year: "" });
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateDate = () => {
    const newErrors = { day: "", month: "", year: "" };
    let isValid = true;

    // Check if fields are empty
    if (!formValues.day) {
      newErrors.day = "This field is required";
      isValid = false;
    }
    if (!formValues.month) {
      newErrors.month = "This field is required";
      isValid = false;
    }
    if (!formValues.year) {
      newErrors.year = "This field is required";
      isValid = false;
    }

    // Validate day, month, year ranges
    const day = parseInt(formValues.day, 10);
    const month = parseInt(formValues.month, 10);
    const year = parseInt(formValues.year, 10);

    if (day < 1 || day > 31) {
      newErrors.day = "Must be a valid day";
      isValid = false;
    }
    if (month < 1 || month > 12) {
      newErrors.month = "Must be a valid month";
      isValid = false;
    }
    const currentYear = new Date().getFullYear();
    if (year > currentYear) {
      newErrors.year = "Must be in the past";
      isValid = false;
    }

    // Validate full date
    const inputDate = new Date(Date.UTC(year, month - 1, day));
    if (
      isNaN(inputDate.getTime()) ||
      inputDate.getUTCDate() !== day ||
      inputDate.getUTCMonth() + 1 !== month ||
      inputDate.getUTCFullYear() !== year
    ) {
      newErrors.day = "Must be a valid date";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculateAge = () => {
    const birthDate = new Date(`${formValues.year}-${formValues.month}-${formValues.day}`);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years: years.toString(), months: months.toString(), days: days.toString() });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validateDate()) {
      calculateAge();
    }
  };

  return (
    <main className="flex h-screen justify-center items-center flex-col bg-offWhite p-5">
      <div className="flex flex-col w-full max-w-xl h-auto bg-white rounded-2xl rounded-br-[150px] md:rounded-br-[200px] p-6 md:p-12 gap-6">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 md:gap-8">
            <div className="flex flex-col gap-1 w-20 sm:w-20 md:w-auto">
              <label className="text-xs font-semibold text-smokeyGray">DAY</label>
              <input
                type="text"
                name="day"
                maxLength={2}
                value={formValues.day}
                onChange={handleInputChange}
                className={`border border-lightGray w-full md:w-28 h-12 rounded-md px-2 md:p-3 tracking-wider bold text-xl outline-none caret-purple focus:border-purple ${errors.day && "border-lightRed"}`}
                placeholder="DD"
              />
              {errors.day && <span className="text-lightRed text-xs italic">{errors.day}</span>}
            </div>
            <div className="flex flex-col gap-1 w-20 sm:w-20 md:w-auto">
              <label className="text-xs font-semibold text-smokeyGray">MONTH</label>
              <input
                type="text"
                name="month"
                maxLength={2}
                value={formValues.month}
                onChange={handleInputChange}
                className={`border border-lightGray w-full md:w-28 h-12 rounded-md px-2 md:p-3 tracking-wider bold text-xl outline-none caret-purple focus:border-purple ${errors.month && "border-lightRed"}`}
                placeholder="MM"
              />
              {errors.month && <span className="text-lightRed text-xs italic">{errors.month}</span>}
            </div>
            <div className="flex flex-col gap-1 w-20 sm:w-20 md:w-auto">
              <label className="text-xs font-semibold text-smokeyGray">YEAR</label>
              <input
                type="text"
                name="year"
                maxLength={4}
                value={formValues.year}
                onChange={handleInputChange}
                className={`border border-lightGray w-full md:w-28 h-12 rounded-md px-1 sm:px-2 md:p-3 tracking-wider bold text-xl outline-none caret-purple focus:border-purple ${errors.year && "border-lightRed"}`}
                placeholder="YYYY"
              />
              {errors.year && <span className="text-lightRed text-xs italic">{errors.year}</span>}
            </div>
          </div>
          <div className="flex justify-center items-center mt-20">
            <div className="flex justify-center md:justify-end items-center w-full h-[1px] bg-lightGray">
              <button type="submit" className="flex w-16 h-16 bg-purple cursor-pointer hover:bg-offBlack justify-center items-center rounded-full p-4">
                <Image src="/svgs/icon-arrow.svg" width={50} height={50} alt="icon" />
              </button>
            </div>
            
          </div>
        </form>
        <div className="flex flex-col gap-3 mt-12">
          <div className="flex gap-3 text-5xl md:text-7xl">
            <span className="extrabolditalic text-purple text-nowrap">{age.years}</span>
            <span className="extrabolditalic">years</span>
          </div>
          <div className="flex gap-3 text-5xl md:text-7xl">
            <span className="extrabolditalic text-purple text-nowrap">{age.months}</span>
            <span className="extrabolditalic">months</span>
          </div>
          <div className="flex gap-3 text-5xl md:text-7xl">
            <span className="extrabolditalic text-purple text-nowrap">{age.days}</span>
            <span className="extrabolditalic">days</span>
          </div>
        </div>
      </div>
    </main>
  );
}

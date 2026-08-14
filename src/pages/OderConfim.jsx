import React from "react";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const OderConfim = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center md:px-4 py- md:py-12 bg-gray-50">
      <div className="w-full max-w-md text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-3 md:p-8">
        <div className="flex justify-center md:mb-5">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <FaCheckCircle className="text-5xl text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 md:mb-3">
          আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
        </h1>

        <p className="text-gray-600 leading-7 mb-6">
          খুব শীঘ্রই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500">
            Athlete Dress-এর সাথে থাকার জন্য
          </p>
          <p className="font-semibold text-gray-800 mt-1">ধন্যবাদ ❤️</p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
        >
          <FaHome />
          হোমে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default OderConfim;

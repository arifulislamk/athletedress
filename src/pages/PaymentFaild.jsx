import React from "react";
import { FaTimesCircle, FaHome, FaRedo } from "react-icons/fa";
import { Link } from "react-router-dom";

const PaymentFaild = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <FaTimesCircle className="text-5xl text-red-500" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          পেমেন্ট সফল হয়নি
        </h1>

        <p className="text-gray-600 leading-7 mb-6">
          দুঃখিত, আপনার পেমেন্টটি সম্পন্ন করা সম্ভব হয়নি।
          <br />
          অনুগ্রহ করে আবার চেষ্টা করুন।
        </p>

        <div className="bg-red-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600">
            আপনার টাকা কেটে গেলে চিন্তার কিছু নেই।
            <br />
            কিছু সময়ের মধ্যে স্বয়ংক্রিয়ভাবে ফেরত আসতে পারে।
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
          >
            <FaHome />
            হোমে যান
          </Link>

          <Link
            to="/checkout"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            <FaRedo />
            আবার চেষ্টা করুন
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentFaild;
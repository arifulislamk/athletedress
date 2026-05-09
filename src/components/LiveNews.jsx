import React from "react";
import Marquee from "react-fast-marquee";

const LiveNews = () => {
  return (
    <div className=" flex font-open-sans">
      <button className="btn hidden md:inline-block md:text-xl">
        ডিসকাউন্ট 50% 
      </button>
      <Marquee >
        <div>
          <p className=" text-orange-900 md:text-2xl">
            🔥 বিশাল ডিসকাউন্ট | ⚽ FIFA World Cup 2026 এর সকল দলের জার্সি খুচরা
            ও পাইকারি বিক্রয় করা হয় |Whatsapp:01727256612
          </p>
        </div>
      </Marquee>
    </div>
  );
};

export default LiveNews;

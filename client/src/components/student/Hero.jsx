import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70">
      <h1 className="md:text-5xl text-3xl relative font-bold text-gray-800 max-w-3xl mx-auto">
        Trao quyền cho tương lai của bạn với các khóa học được thiết kế để
        <span className="text-blue-600"> phù hợp với lựa chọn của bạn. </span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </h1>
      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto md:text-base text-sm">
        Chúng tôi mang đến những giảng viên hàng đầu thế giới, nội dung tương tác và một
        cộng đồng hỗ trợ để giúp bạn đạt được các mục tiêu cá nhân và nghề nghiệp.
      </p>
      <p className="md:hidden text-gray-500 max-w-sm mx-auto md:text-base text-sm">
        Chúng tôi mang đến những giảng viên hàng đầu thế giới để giúp bạn đạt được các mục tiêu nghề nghiệp.
      </p>
      <SearchBar />
    </div>
  );
};

export default Hero;
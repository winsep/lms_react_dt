import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">Học từ những người giỏi nhất</h2>
      <p className="text-sm md:text-base text-gray-500 mt-3">
        Khám phá các khóa học được đánh giá cao nhất của chúng tôi trong nhiều danh mục. Từ lập trình
        và thiết kế đến <br/>kinh doanh và sức khỏe, các khóa học của chúng tôi được thiết kế để mang lại
        kết quả.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] px-4 md:my-16 my-10 gap-4">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Link to={'/course-list'} onClick={() => scrollTo(0, 0)}
      className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded"
      >Xem tất cả khóa học</Link>
    </div>
  );
};

export default CoursesSection;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res);
    }

    fetchData();
  }, []);

  const displayCourse = () => {
    if (courses.length === 0) {
      return <div></div>;
    }

    return courses.data.map((course, idx) => {
      return (
        <div className="grid-33" key={idx}>
          <a
            className="course--module course--link"
            href={`/courses/${course.id}`}
          >
            <h4 className="course--label">{course.title}</h4>
            <h3 className="course--title">
              {course.description.substring(0, 70)}...
            </h3>
          </a>
        </div>
      );
    });
  };

  return (
    <div className="bounds">
      {displayCourse()}
      <div className="grid-33">
        <a
          className="course--module course--add--module"
          href="/courses/create"
        >
          <h3 className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </h3>
        </a>
      </div>
    </div>
  );
};

export default Courses;

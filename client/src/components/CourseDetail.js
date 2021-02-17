import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import history from "../history";

const CourseDetail = ({ auth }) => {
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchCourse() {
      const res = await axios.get(
        `http://localhost:5000/api${window.location.pathname}`
      );

      setCourse(res.data.course);
      setUser(res.data.user);
    }

    fetchCourse();
  }, []);

  const deleteCourse = async () => {
    await axios.delete(`http://localhost:5000/api${window.location.pathname}`);
    history.push("/");
  };

  return (
    <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            {auth.id === course.userId ? (
              <span>
                <a className="button" href={`/courses/${course.id}/update`}>
                  Update Course
                </a>
                <button className="button" onClick={deleteCourse}>
                  Delete Course
                </button>
              </span>
            ) : (
              ""
            )}
            <a className="button button-secondary" href="/">
              Return to List
            </a>
          </div>
        </div>
      </div>
      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
            <p>
              By {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="course--description">
            <ReactMarkdown source={course.description} />
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{course.estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ReactMarkdown source={course.materialsNeeded} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

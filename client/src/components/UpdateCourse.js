import React, { useState, useEffect } from "react";
import axios from "axios";

import history from "../history";

const UpdateCourse = ({ auth }) => {
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  const courseId = window.location.pathname.split("/");

  useEffect(() => {
    async function fetchCourse() {
      const res = await axios.get(
        `http://localhost:5000/api/courses/${courseId[2]}`
      );

      const course = res.data.course;
      setTitle(course.title);
      setDescription(course.description);
      setEstimatedTime(course.estimatedTime);
      setMaterialsNeeded(course.materialsNeeded);
      setUser(res.data.user);
    }

    fetchCourse();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/courses/${courseId[2]}`,
        {
          title,
          description,
          estimatedTime,
          materialsNeeded,
        },
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      history.push(`/courses/${courseId[2]}`);
    } catch (err) {
      console.log(err.request);
    }
  };

  return (
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        <form onSubmit={onSubmit}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="input-title course--title--input"
                  placeholder={title}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <p>
                By {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="course--description">
              <div>
                <textarea
                  id="description"
                  name="description"
                  className=""
                  placeholder={description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      className="course--time--input"
                      placeholder={estimatedTime}
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(e.target.value)}
                    />
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      className=""
                      placeholder={materialsNeeded}
                      value={materialsNeeded}
                      onChange={(e) => setMaterialsNeeded(e.target.value)}
                    ></textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">
              Update Course
            </button>
            <button className="button button-secondary" href="/">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;

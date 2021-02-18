import React, { useState, useEffect } from "react";
import axios from "axios";

import history from "../history";

const UpdateCourse = ({ auth }) => {
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [id, setId] = useState(null);
  const [errors, setErrors] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const courseId = window.location.pathname.split("/");

  // gets the course and user when the page is renders
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
      setId(course.id);
      setUser(res.data.user);
    }

    fetchCourse();
  }, []);

  // submits a put request to the relevant id when the form is submitted
  const onSubmit = async (e) => {
    e.preventDefault();
    renderErrors();
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

  // looks at the state to see if all the relevant info is there. If its not, it sets error messages in the state to me displayed to the user
  const renderErrors = () => {
    if (title.length === 0) {
      setTitleError('Please provide a value for "Title"');
      setErrors(true);
    }

    if (title.length > 0) {
      setTitleError("");
    }

    if (description.length === 0) {
      setDescriptionError('Please provide a value for "Description"');
      setErrors(true);
    }

    if (description.length > 0) {
      setDescriptionError("");
    }
  };

  // displays errors on the pahge if the errors state is set at true
  return (
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        {errors ? (
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul className="errors">
                <li>{titleError}</li>
                <li>{descriptionError}</li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
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
            <a className="button button-secondary" href={`/courses/${id}`}>
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;

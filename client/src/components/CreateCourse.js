import React, { useState } from "react";
import axios from "axios";

import history from "../history";

const CreateCourse = ({ auth }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  // only posts when there is info in the title and description
  const onSubmit = async (e) => {
    e.preventDefault();
    renderErrors();
    if (title.length > 0 && description.length > 0) {
      setErrors(false);
      const res = await axios.post(
        "http://localhost:5000/api/courses",
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
      history.push("/");
      console.log(res);
    }
  };

  // sets errors in state to be shown to the user if there is enough info in the relevant inputs
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

  // only shows errors when the errors state is at true, Gets set to true in the renderErrors() function
  return (
    <div className="bounds course--detail">
      <h1>Create Course</h1>
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
                  placeholder="Course title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <p>By Joe Smith</p>
            </div>
            <div className="course--description">
              <div>
                <textarea
                  id="description"
                  name="description"
                  className=""
                  placeholder="Course description..."
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
                      placeholder="Hours"
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
                      placeholder="List materials..."
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
              Create Course
            </button>
            <a className="button button-secondary" href="/">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;

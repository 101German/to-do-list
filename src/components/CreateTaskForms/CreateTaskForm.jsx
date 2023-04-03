import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CreateTaskForms.css";
import database from "../../config";
import { doc, getDoc } from "firebase/firestore";
import InputField, { Input } from "../Shared/Input";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";

function CreateTaskForm(props) {
  const [name, setNameTask] = useState("");
  const [desc, setDescTask] = useState("");
  const [date, setDateTask] = useState(new Date());
  let navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    const getTaskForUpdate = async () => {
      if (params.id != undefined) {
        const taskRef = doc(database, "tasks", params.id);
        const task = (await getDoc(taskRef)).data();
        console.log("task in form ", task);
        setNameTask(task.name);
        setDescTask(task.desc);
        console.log("task date ", task.date);
        setDateTask(task.date);
      } else if (props.selectDate) {
        const date = new Date(props.selectDate);
        date.setHours(3);
        setDateTask(date.toISOString().slice(0, 10));
      }
    };
    getTaskForUpdate();
  }, []);

  const handleChangeName = (event) => {
    setNameTask(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setDescTask(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDateTask(event.target.value);
  };
  const submitForm = () => {
    event.preventDefault();
    if (name === "" || desc === "" || date === "") {
      alert("Validation error, pass empty value");
    } else {
      if (params.id != undefined) {
        props.updateTask({ name, desc, date }, params.id);
      } else {
        props.addTask({ name, desc, date });
      }
      navigate("/");
    }
  };
  return (
    <div className="form_container">
      <Link to="/">
        <p className="form_header">&#60; Tasks</p>
      </Link>
      <form className="task_form">
        <p className="form_title">
          {params.id != undefined ? "Update task" : "Create task"}
        </p>
        <div className="form_group">
          <span>Name</span>
          <InputField
            typeInput="text"
            styleName="name_input"
            value={name}
            placeholder="..."
            handleChangeValue={handleChangeName}
          />
        </div>
        <div className="form_group">
          <span>Description</span>
          <textarea
            placeholder="..."
            className="desc_input"
            value={desc}
            onChange={handleChangeDesc}
          ></textarea>
        </div>
        <div className="form_group">
          <span>Date</span>
          <InputField
            typeInput="date"
            styleName="date_input"
            value={date}
            placeholder="..."
            handleChangeValue={handleChangeDate}
          />
        </div>
        <button className="submit_button" onClick={submitForm}>
          {params.id != undefined ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default CreateTaskForm;

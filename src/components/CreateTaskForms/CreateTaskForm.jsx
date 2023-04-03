import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CreateTaskForms.css";
import database from "../../config";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

function CreateTaskForm(props) {
  const [name, setNameTask] = useState("");
  const [desc, setDescTask] = useState("");
  const [date, setDateTask] = useState(new Date());
  const [formTitle, setFormTitle] = useState("");
  const [formSubmit, setFormSubmit] = useState();
  const [formButtonTitle, setFormButtonTitle] = useState("");

  const params = useParams();
  useEffect(() => {
    const getTaskForUpdate = async () => {
      if (params.id != undefined) {
        const taskRef = doc(database, "tasks", params.id);
        const task = (await getDoc(taskRef)).data();
        console.log("task in form ", task);
        setFormTitle("Edit task");
        setFormButtonTitle("Edit");
        setNameTask(task.name);
        setDescTask(task.desc);
        setDateTask(task.date);
        //setFormSubmit(props.updateTask);
      } else {
        //setFormSubmit(props.addTask);
        setFormTitle("Create new task");
        setFormButtonTitle("Create");
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
    if (params.id != undefined) {
      props.updateTask({ name, desc, date }, params.id);
    } else {
      props.addTask({ name, desc, date });
    }
  };
  return (
    <div className="form_container">
      <Link to="/">
        <p className="form_header">&#60; Tasks</p>
      </Link>
      <form className="task_form">
        <p className="form_title">{formTitle}</p>
        <div className="form_group">
          <span>Name</span>
          <input
            type="text"
            placeholder="..."
            className="name_input"
            value={name}
            onChange={handleChangeName}
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
          <input
            type="date"
            name="calendar"
            className="date_input"
            value={date}
            onChange={handleChangeDate}
          />
        </div>
        <button className="submit_button" onClick={submitForm}>
          {formButtonTitle}
        </button>
      </form>
    </div>
  );
}

export default CreateTaskForm;

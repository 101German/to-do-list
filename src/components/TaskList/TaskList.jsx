import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import "./TaskList.css";
import { Link } from "react-router-dom";

function TaskList(props) {
  // useEffect(() => {
  //   console.log("use effect from task list", props.taskList);
  //   console.log("use effect from select date", props.selectDate);
  //   if (props.selectDate != undefined) {
  //     const tasksForList = [];
  //     props.taskList.forEach((task) => {
  //       const taskDate = new Date(task.date);
  //       if (
  //         new Date(
  //           taskDate.getFullYear(),
  //           taskDate.getMonth(),
  //           taskDate.getDate()
  //         ).getTime() === props.selectDate.getTime()
  //       ) {
  //         tasksForList.push(task);
  //       }
  //     });
  //     setTaskList(tasksForList);
  //   } else {
  //     console.log("tasks list ", props.taskList);
  //     setTaskList(props.taskList);
  //   }
  // }, []);
  // if (props.selectDate != undefined) {
  //   console.log("date here ", props.selectDate);
  //   console.log("from here ", props.taskList);
  //   const tasksForList = [];
  //   props.taskList.forEach((task) => {
  //     const taskDate = new Date(task.date);
  //     if (
  //       new Date(
  //         taskDate.getFullYear(),
  //         taskDate.getMonth(),
  //         taskDate.getDate()
  //       ).getTime() === props.selectDate.getTime()
  //     ) {
  //       tasksForList.push(task);
  //     }
  //   });
  //   //  setTaskList(tasksForList);
  // } else if (props.taskList) {
  //   console.log("props for list ", props.taskList);
  //   //setTaskList(props.taskList);
  // }
  console.log("task list", props.taskList);
  return (
    <div className="task_block">
      <div className="task_block_title">
        <p>Current tasks: </p>
      </div>
      <ul className="task_list">
        {props.taskList.map((task) => (
          <li className="task_item" key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => {
                  props.changeDone(task.id);
                }}
              />
              <div className="task_checkbox"></div>
            </label>
            <Link to={`/create-task-form/${task.id}`}>
              <span>{task.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

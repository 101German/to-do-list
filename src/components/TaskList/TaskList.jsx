import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import "./TaskList.css";
import { Link } from "react-router-dom";

function TaskList(props) {
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

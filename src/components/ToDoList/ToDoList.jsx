import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import Calendar from "../Calendar/Calendar";
import Header from "../Header/Header";
import TaskList from "../TaskList/TaskList";
import "./ToDoList.css";
import database, { auth } from "../../config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import CreateTaskForm from "../CreateTaskForms/CreateTaskForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import SignInForm from "../SignInForm/SignInForm";
import { onAuthStateChanged } from "firebase/auth";

function AddButton() {
  return (
    <Link to="create-task-form">
      <button className="add_task_button">Add task</button>
    </Link>
  );
}

function ToDoList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [tasksForList, setTasksForList] = useState([]);
  const [selectDate, setSelectDate] = useState();
  const [currentUser, setCurrentUser] = useState();
  const taskCollectionRef = collection(database, "tasks");

  const getTasks = async () => {
    const data = await getDocs(taskCollectionRef);
    let taskList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return taskList;
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getTasks().then((res) => {
          const tasksForUser = res.filter((task) => {
            return task.userId === user.uid;
          });
          setTasks(tasksForUser);
          if (selectDate == undefined) {
            const currentTasks = res.filter((task) => {
              const taskDate = new Date(task.date);
              const today = new Date();
              setSelectDate(
                new Date(today.getFullYear(), today.getMonth(), today.getDate())
              );
              return (
                new Date(
                  taskDate.getFullYear(),
                  taskDate.getMonth(),
                  taskDate.getDate()
                ).getTime() ===
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate()
                ).getTime()
              );
            });
            setTasksForList(currentTasks);
          }
        });
      } else {
        navigate("/sign-in");
      }
    });
  }, []);

  const changeDone = (taskId) => {
    const newTasks = JSON.parse(JSON.stringify(tasks));
    const newTasksForList = JSON.parse(JSON.stringify(tasksForList));
    newTasks.forEach((task) => {
      if (task.id === taskId) {
        const taskDoc = doc(database, "tasks", taskId);
        updateDoc(taskDoc, { done: !task.done });
        task.done = !task.done;
        return;
      }
    });

    newTasksForList.forEach((task) => {
      if (task.id === taskId) {
        const taskDoc = doc(database, "tasks", taskId);
        updateDoc(taskDoc, { done: !task.done });
        task.done = !task.done;
        return;
      }
    });
    setTasksForList(newTasksForList);
    setTasks(newTasks);
  };

  const selectDay = (date) => {
    setSelectDate(date);
    const listTasks = [];

    getTasks().then((res) => {
      res.forEach((task) => {
        const taskDate = new Date(task.date);
        if (
          new Date(
            taskDate.getFullYear(),
            taskDate.getMonth(),
            taskDate.getDate()
          ).getTime() === date.getTime() &&
          task.userId === currentUser.uid
        ) {
          listTasks.push(task);
        }
      });
      setTasksForList(listTasks);
    });
  };

  const addTask = (task) => {
    const newTask = { ...task, done: false, userId: currentUser.uid };

    addDoc(taskCollectionRef, newTask).then(() => {
      getTasks().then((res) => {
        const tasksForUser = res.filter((task) => {
          return task.userId === currentUser.uid;
        });
        setTasks(tasksForUser);
        selectDay(selectDate);
      });
    });

    event.preventDefault();
  };

  const updateTask = async (updatedTask, taskId) => {
    event.preventDefault();
    const taskDoc = doc(database, "tasks", taskId);
    updateDoc(taskDoc, updatedTask).then(() => {
      getTasks().then((res) => {
        const tasksForUser = res.filter((task) => {
          return task.userId === currentUser.uid;
        });
        setTasks(tasksForUser);
        selectDay(selectDate);
      });
    });
  };

  return (
    <div className="to-do-list">
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Header />
              <Calendar
                taskList={tasks}
                selectDay={selectDay}
                selectedDate={selectDate}
              />
              <TaskList
                taskList={tasksForList}
                selectDate={selectDate}
                changeDone={changeDone}
              />
              <AddButton />
            </Fragment>
          }
        />
        <Route
          path="/create-task-form"
          element={
            <CreateTaskForm
              updateTask={updateTask}
              addTask={addTask}
              selectDate={selectDate}
            />
          }
        >
          <Route
            index
            element={
              <CreateTaskForm addTask={addTask} selectDate={selectDate} />
            }
          />
          <Route
            path=":id"
            element={<CreateTaskForm updateTask={updateTask} />}
          />
        </Route>
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
      </Routes>
    </div>
  );
}

export default ToDoList;

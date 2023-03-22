
import './App.css';
import React, { Component, Fragment } from 'react';

import ToDoList from './components/ToDoList/ToDoList';
import { BrowserRouter } from 'react-router-dom';
import CreateTaskForm from './components/CreateTaskForms/CreateTaskForm'


function App() {

  // const Get = () => {
  //   const dbRef = ref(database, 'tasks');

  //   onValue(dbRef, (snapshot) => {
  //     snapshot.forEach((childSnapshot) => {
  //       const key = childSnapshot.key;
  //       const data = childSnapshot.val();
  //       console.log("key: ", key);
  //       console.log("data:", data);
  //     });
  //   }, {
  //     onlyOnce: true
  //   });
  // }

  return (
    <ToDoList />
  );
}

export default App;
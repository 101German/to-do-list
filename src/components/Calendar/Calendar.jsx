import React, { Component, Fragment, useState, useEffect } from "react";
import "./Calendar.css";

function Calendar(props) {
  const getFullYear = () => {
    return new Date().getFullYear();
  };

  const getMonth = () => {
    return new Date().getMonth();
  };
  const listDays = [];

  const days = 32 - new Date(getFullYear(), getMonth(), 32).getDate();

  for (let i = 1; i < days + 1; i++) {
    let dotDone;
    let dotNotDone;
    let classCalendarItem = "calendar_item";
    let dayNumber = new Date(getFullYear(), getMonth(), i).getDay();
    let dayName = "";
    switch (dayNumber) {
      case 0:
        dayName = "Sun";
        break;
      case 1:
        dayName = "Mon";
        break;
      case 2:
        dayName = "Tue";
        break;
      case 3:
        dayName = "Wed";
        break;
      case 4:
        dayName = "Thu";
        break;
      case 5:
        dayName = "Fri";
        break;
      case 6:
        dayName = "Sat";
        break;
      default:
        break;
    }

    let calendarDay;
    if (
      new Date(getFullYear(), getMonth(), i).getDate() == new Date().getDate()
    ) {
      classCalendarItem += " today";
    }
    // console.log("select date ", props.selectedDate);
    // console.log("current date ", new Date(getFullYear(), getMonth(), i));
    if (
      new Date(getFullYear(), getMonth(), i).getTime() ===
      new Date(props.selectedDate).getTime()
    ) {
      classCalendarItem += " active";
    }
    let currentTasks = props.taskList.filter((item) => {
      let itemDay = new Date(item.date);
      let currentDay = new Date(getFullYear(), getMonth(), i);
      return (
        currentDay.getTime() ===
        new Date(
          itemDay.getFullYear(),
          itemDay.getMonth(),
          itemDay.getDate()
        ).getTime()
      );
    });
    let hasDoneTask = currentTasks.some((task) => {
      return task.done === true;
    });
    let hasNotDoneTask = currentTasks.some((task) => {
      return task.done === false;
    });

    if (hasDoneTask) {
      dotDone = <div className="dot_done"></div>;
    }

    if (hasNotDoneTask) {
      dotNotDone = <div className="dot_notdone"></div>;
    }

    calendarDay = (
      <div className="calendar_block" key={i}>
        <div
          className={classCalendarItem}
          onClick={() => {
            props.selectDay(new Date(getFullYear(), getMonth(), i));
          }}
        >
          <p className="item_day">{dayName}</p>
          <p className="item_number">{i}</p>
        </div>
        <div className="item_dots">
          {dotDone}
          {dotNotDone}
        </div>
      </div>
    );

    listDays.push(calendarDay);
  }

  return <div className="calendar">{listDays}</div>;
}

export default Calendar;

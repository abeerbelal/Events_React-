import React from 'react';
import classes from './task.module.css';
function Task(props) {
  return (
    <li className={classes.task} style={{backgroundColor: props.backgroundColor}} onClick={props.onClick}>
    <h2>{props.title}</h2>
    <h3>{props.releaseDate}</h3>
    <p>{props.openingText}</p>
  </li>
  );
}

export default Task;
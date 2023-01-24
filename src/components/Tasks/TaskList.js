import React from 'react';
import Task from './Task';
import classes from './taskList.module.css';
const TaskList = (props) => {
  return (
    <ul className={classes['tasks-list']}>
    {props.tasks.map((task) => (
      <Task
        key={task.id}
        title={task.title}
        releaseDate={task.releaseDate.toDateString()}
        openingText={task.openingText}
        backgroundColor={task.backgroundColor}
        onClick={() => props.onTaskClick(task)}
      />
    ))}
  </ul>
  );
}

export default TaskList;
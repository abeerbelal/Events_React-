import React, { useRef, useState } from 'react';
//import { useLocation } from 'react-router-dom';
import classes from './form.module.css'
import NavigationBar from '../Layout/NavigationBar';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Form(props) {
  
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(props.selectedTask ? props.selectedTask.releaseDate : new Date());

  
  function submitHandler(event) {
    event.preventDefault();
    const task = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: selectedDate,
    };

   addTaskHandler(task);
   navigate('/show');
  }
  async function addTaskHandler(task) {
    const response = await fetch('https://react-task-793d2-default-rtdb.firebaseio.com/tasks.json', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    navigate('/');
  }

 // console.log(props);
  return (
    <React.Fragment>
    <NavigationBar />
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Name </label>
        <input type='text' id='title' ref={titleRef} defaultValue={titleRef.current} />
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Description</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef} defaultValue={openingTextRef.current}></textarea>
      </div>
      <div className={classes.control}>
    <label htmlFor='date'>Date</label>
    <DatePicker id='date' selected={selectedDate} onChange={date => setSelectedDate(date)} />

</div>
      <button className={classes.btn}>Add Event</button>
      <button className={classes.btn} onClick={() => navigate('/show')}>Cancle</button>
    </form>
    </React.Fragment>
  );
}

export default Form;
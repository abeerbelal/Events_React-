import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import NavigationBar from '../Layout/NavigationBar';
import styled from './form.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function FormEdit() {
  const location = useLocation();
  const selectedTask = location.state.task;
  const titleRef = useRef(selectedTask.title);
  const openingTextRef = useRef(selectedTask.openingText);


  const [selectedDate, setSelectedDate] = useState(selectedTask.releaseDate);

  const navigate = useNavigate();
  async function updateTaskHandler(task) {
    const response = await fetch(`https://react-task-793d2-default-rtdb.firebaseio.com/tasks/${selectedTask.id}.json`, {
      method: 'PATCH',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    navigate('/');
  }

  function submitHandler(event) {
    event.preventDefault();
    const task = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: selectedDate,
    };
    updateTaskHandler(task);
    navigate('/show');
  }

  return (
    <React.Fragment>   
    <NavigationBar />
    <form onSubmit={submitHandler}>
      <div className={styled.control}>
        <label htmlFor='title'>Name </label>
        <input type='text' id='title' defaultValue={selectedTask.title} ref={titleRef} />
      </div>
      <div className={styled.control}>
        <label htmlFor='opening-text'>Description</label>
        <textarea rows='5' id='opening-text' defaultValue={selectedTask.openingText} ref={openingTextRef}></textarea>
      </div>
      <div className={styled.control}>
  <label htmlFor='date'>Date</label>
  <DatePicker
    id='date'
    selected={selectedDate}
    onChange={date => setSelectedDate(date)}
  />
</div>
      <button className={styled.btn}>Save </button>
      <button className={styled.btn} onClick={() => navigate('/show')}>Cancle</button>
    </form>
    </React.Fragment>
  );
}

export default FormEdit;


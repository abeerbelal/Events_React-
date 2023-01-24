import React, { useState, useEffect, useCallback } from 'react';
import NavigationBar from '../components/Layout/NavigationBar';
import './show.module.css';
import TaskList from './Tasks/TaskList';
import { useNavigate, useLocation } from 'react-router-dom';

function Show() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();

  const fetchTasksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-task-793d2-default-rtdb.firebaseio.com/tasks.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedTasks = [];

      for (const key in data) {
        loadedTasks.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: new Date(data[key].releaseDate),
          backgroundColor: getBackgroundColor(new Date(data[key].releaseDate)),
        });
      }

      setTasks(loadedTasks);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const handleTaskClick = (task) => {
    navigate('/formE', { state: { task } });
   // console.log(task);
  }

  
  const getBackgroundColor = (releaseDate) => {
    if(releaseDate.toDateString() === new Date().toDateString()){
      return 'lightblue'
    }
    else if(releaseDate < new Date()){
      return 'pink'
    }
    else {
      return '#DCA0F5'
    }
  }


  useEffect(() => {

        fetchTasksHandler();
   
}, [fetchTasksHandler, location]);



  let content = <p>Found no Events.</p>;

  if (tasks.length > 0) {
    content = (
      <>
        <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
      </>
    );
  }


  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <div className='space'>
      </div>
      <NavigationBar />
      <section>{content}</section>
    </React.Fragment>
  );
}

export default Show;


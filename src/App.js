import React from 'react';
import Form from './components/Tasks/Form';
import Show from './components/Show';
import FormEdit from './components/Tasks/FormEdit';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className=''>
   <Routes>
      <Route path='/' element={<Show />} ></Route>   
      <Route path='form' element={<Form />}></Route> 
      <Route path='show'element={<Show />}></Route> 
      <Route path='formE' element={<FormEdit />}></Route>   
     
      </Routes>
     

   

  </div>
  );
}

export default App;
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Student from './pages/StudentExam/Student';
import House from './pages/HouseExam/House';

function App() {

  

  return (
    <Routes>
      <Route path='/student' element={<Student />}/>
      <Route path='/house' element={<House />}/>
</Routes>
  );
}

export default App;

import './App.css';
import LandingPage from './Pages/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import StudentDashboard from './Pages/StudentDashboard';
import LibrianDashboard from './Pages/LibrianDashboard';
import BookIssue from './Pages/BookIssue';

function App() {
  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/StudentDashboard/:id' element={<StudentDashboard/>}/>
          <Route path='/LibrianDashboard' element={<LibrianDashboard/>}/>
          <Route path='/BookIssue' element={<BookIssue/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

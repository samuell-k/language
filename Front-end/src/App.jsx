import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';
import SignUp from './Components/Signup';
import './App.css';
import Login from './Components/Login';
import About_us from './Components/About_us'
import AdminPage from './Components/Adminpage';
import NotFound from './Components/Notfound';
import TeacherPage from './Components/TeacherPage';
import StudentPage from './Components/StudentPage';
import CreateEvent from './Components/CreateEvent';
import CreateGroup from './Components/CreateGroup';
import CreatePayment from './Components/CreatePayment';
import ViewEvent from './Components/ViewEvent'
import ViewTeacher from './Components/ViewTeacher';
function App() {
  return (
    <Router>
      <Header />
      <Routes>

        <Route path='/' element={<Body />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About_us />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/teacher' element={<TeacherPage />} />
        <Route path='/student' element={<StudentPage />} />
        <Route path='/create-event' element={<CreateEvent />} />
        <Route path='/create-group' element={<CreateGroup />} />
        <Route path='/create-payment' element={<CreatePayment />} />
        <Route path='/view-event' element={<ViewEvent />} />
        <Route path='/view-teacher' element={<ViewTeacher />} />
        

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

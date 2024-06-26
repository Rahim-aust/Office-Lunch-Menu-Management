import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Menu from './Components/Menu';
import Profile from './Components/Profile';
import AddMenu from './Components/AddMenu';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDashBoard from './Components/EmployeeDashBoard';
import PrivateRoute from './Components/PrivateRoute';
import EmployeePrivateRoute from './Components/EmployeePrivateRoute';
import ViewMenu from './Components/ViewMenu';
import SelectChoice from './Components/SelectChoice';
import NotFound from './Components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/employee_login' element={<EmployeeLogin />} />
        
        <Route
          path='/employee_dashboard'
          element={
            <EmployeePrivateRoute>
              <EmployeeDashBoard />
            </EmployeePrivateRoute>
          }
        >
          <Route path='' element={<ViewMenu />} />
          <Route path='Lunch_View' element={<ViewMenu />} />
          <Route path='Select_Lunch' element={<SelectChoice />} />
        </Route>

        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path='' element={<Home />} />
          <Route path='Menu' element={<Menu />} />
          <Route path='profile' element={<Profile />} />
          <Route path='AddMenu' element={<AddMenu />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

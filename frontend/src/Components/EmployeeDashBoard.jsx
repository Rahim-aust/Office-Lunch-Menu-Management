import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

const EmployeeDashBoard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get('http://localhost:3000/employee/logout');
      if (result.data.Status) {
        localStorage.removeItem('valid');
        navigate('/');
      }
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/employee_dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Employee Panel
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/employee_dashboard/Lunch_View"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-list-ul ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">View Menu</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employee_dashboard/Select_Lunch"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-check2-square ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Select Choice</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/employee_dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Lunch Menu</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashBoard;

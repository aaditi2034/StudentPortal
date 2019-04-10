import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './Dashboard.css';

const Dashboard = (props) => {
  const { userName } = props;
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-info">
        <div className="dashboard navbar-brand"><strong>STUDENT PORTAL</strong></div>
        <div className="username dashboard text-right">
          <DropdownButton variant="secondary" id="dropdown-basic-button" title={userName}>
            <Dropdown.Item href="/">Logout</Dropdown.Item>
            <Dropdown.Item href="/aboutUs">About Us</Dropdown.Item>
          </DropdownButton>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;

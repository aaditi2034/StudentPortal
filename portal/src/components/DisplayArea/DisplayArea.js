import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import SignUp from '../SignUp';
import Login from '../Login';
import ListStudents from '../ViewRecords/ListStudents';
import AboutUs from '../ViewRecords/AboutUs';

const DisplayArea = () => (
  <Router>
    <div>
      <div>
        <Route exact path="/" component={SignUp} />
        <Route path="/login" component={Login} />
      </div>
      <Route path="/studentPortal" component={ListStudents} />
      <Route path="/aboutUs" component={AboutUs} />
    </div>
  </Router>
);

export default DisplayArea;

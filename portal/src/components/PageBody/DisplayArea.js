import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import SignUp from '../../containers/SignUp/SignUp';
import Login from '../../containers/Login/Login';
import ListStudents from '../../containers/ViewRecords/ListStudents';

const DisplayArea = () => (
  <Router>
    <div>
      <div>
        <Route exact path="/" component={SignUp} />
        <Route path="/login" component={Login} />
      </div>
      <Route path="/studentPortal" component={ListStudents} />
    </div>
  </Router>
);

export default DisplayArea;

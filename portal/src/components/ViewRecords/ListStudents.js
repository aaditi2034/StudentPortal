import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';
import paginationFactory from 'react-bootstrap-table2-paginator';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';
import StudentData from '../../data/StudentData';
import AddStudent from './AddStudent';
import SortBy from './SortBy';

const columns = [{
  dataField: 'rollno',
  text: 'Roll No',
  sort: true,
},
{
  dataField: 'name',
  text: 'Name',
  sort: true,
},
{
  dataField: 'subject',
  text: 'Subject',
  sort: true,
},
{
  dataField: 'marks',
  text: 'Marks',
  sort: true,
}];

class ListStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalAdd: false,
      showModalSort: false,
    };
  }

  handleAdd = (bool) => {
    if (!bool) {
      this.setState({ showModalAdd: false });
    } else {
      this.setState({ showModalAdd: true });
    }
  };

  handleSort = (bool) => {
    if (!bool) {
      this.setState({ showModalSort: false });
    } else {
      this.setState({ showModalSort: true });
    }
  };

  render() {
    const { location } = this.props;
    const { userName } = location.state;
    const { showModalAdd, showModalSort } = this.state;
    return (
      <div>
        <div>
          <Dashboard userName={userName} />
        </div>
        <div className="text-center">
          <div className="btn">
            <Button variant="warning" value="Add Students" onClick={this.handleAdd}>Add Students</Button>
          </div>
          <div className="btn">
            <Button variant="warning" value="Sort By" type="submit" onClick={this.handleSort}>Sort By</Button>
          </div>
        </div>
        <AddStudent showForm={showModalAdd} action={this.handleAdd} />
        <SortBy showForm={showModalSort} action={this.handleSort} />
        <div>
          <BootstrapTable
            striped
            hover
            keyField="id"
            data={StudentData}
            columns={columns}
            pagination={paginationFactory()}
          />
        </div>
      </div>
    );
  }
}

export default ListStudents;

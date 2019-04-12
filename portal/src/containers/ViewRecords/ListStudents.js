import React from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Dashboard from '../../components/PortalDashboard/Dashboard';
import AddStudent from '../InsertRecord/AddStudent';
import SortBy from '../SortRecords/SortBy';
import './Button.css';
import { fetchData } from '../../API/studentApi';

const columns = [{
  dataField: 'rollno',
  text: '^ Roll No',
  sort: true,
},
{
  dataField: 'name',
  text: '^ Name',
  sort: true,
},
{
  dataField: 'subject',
  text: '^ Subject',
  sort: true,
},
{
  dataField: 'marks',
  text: '^ Marks',
  sort: true,
}];

class ListStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalAdd: false,
      showModalSort: false,
      data: '',
    };
  }

  componentDidMount() {
    this.handleData();
  }

  handleData = () => {
    fetchData().then(data => this.setState({ data }));
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
    const { showModalAdd, showModalSort, data } = this.state;
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
        <AddStudent showForm={showModalAdd} action={this.handleAdd} apiCall={this.handleData} />
        <SortBy showForm={showModalSort} data={data} action={this.handleSort} />
        <div>
          <BootstrapTable
            striped
            hover
            keyField="id"
            data={data}
            columns={columns}
            pagination={paginationFactory()}
          />
        </div>
      </div>
    );
  }
}

export default ListStudents;

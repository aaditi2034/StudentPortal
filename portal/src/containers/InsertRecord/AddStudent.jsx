import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputField from '../../formFields/InputField';
import { insertData } from '../../API/studentApi';

class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMember: {
        rollno: '',
        name: '',
        subject: '',
        marks: '',
      },
      showAddModal: false,
      formErrors: { name: '', marks: '' },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showForm !== false) {
      const { showForm } = nextProps;
      this.setState({ showAddModal: showForm });
    }
  }

  close = () => {
    const { action } = this.props;
    this.setState({ showAddModal: false });
    action(false);
  }

  handleChange = (event) => {
    event.preventDefault();
    const {
      name, rollno, value, subject, marks,
    } = event.target;
    const { newMember, formErrors } = this.state;
    switch (name) {
      case 'name':
        formErrors.name = value.length < 3 || value.length > 30 ? 'Length of Name is not in range' : '';
        break;
      case 'marks':
        formErrors.marks = marks < 100 ? '' : 'Marks greater than total marks';
        break;
      default:
        break;
    }
    newMember[rollno] = rollno;
    newMember[name] = value;
    newMember[subject] = subject;
    newMember[marks] = marks;
    this.setState({ formErrors, newMember });
  }

  handleViewRecords = (data) => {
    const { onadd } = this.props;
    onadd(data);
  }

  apiPut = () => {
    const { newMember } = this.state;
    insertData(newMember).then(() => {
      const { apiCall } = this.props;
      apiCall();
    });
  }

  addRecord = () => {
    const { action } = this.props;
    this.apiPut();
    this.setState({ showAddModal: false, newMember: {} });
    action(false);
  };

  render() {
    const { showAddModal, newMember, formErrors } = this.state;
    const isValid = newMember.name !== ''
                     && newMember.rollno > 0 && newMember.marks < 100 && newMember.marks > 0;
    return (
      <div>
        <Modal show={showAddModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Student Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-container">
              <div className="form-group">
                <InputField
                  inputType="text"
                  title="Roll No"
                  name="rollno"
                  value={newMember.rollno}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <InputField
                  inputType="text"
                  title="Full Name"
                  name="name"
                  value={newMember.name}
                  placeholder="Enter Full Name"
                  onChange={this.handleChange}
                />
              </div>
              {formErrors.name.length > 0 && (
                <span className="err">{formErrors.name}</span>
              )}
              <div className="form-group">
                <InputField
                  inputType="text"
                  title="Subject"
                  name="subject"
                  value={newMember.subject}
                  placeholder="Enter Subject"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <InputField
                  inputType="number"
                  title="Marks"
                  name="marks"
                  value={newMember.marks}
                  placeholder="Enter Marks"
                  onChange={this.handleChange}
                />
              </div>
              {formErrors.marks > 100 && (
                <span className="err">{formErrors.marks}</span>
              )}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button onClick={this.addRecord} disabled={!isValid}>Add Student</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddStudent;

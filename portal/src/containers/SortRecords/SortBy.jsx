/* eslint-disable func-names */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MDBFormInline, MDBInput } from 'mdbreact';

class SortBy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      radio: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showForm !== false) {
      const { showForm } = nextProps;
      this.setState({ showModal: showForm });
    }
  }

  close = () => {
    const { action } = this.props;
    this.setState({ showModal: false });
    action(false);
  }

  onClick = nr => () => {
    this.setState({ radio: nr });
  }

  sortRecord = () => {
    const { radio } = this.state;
    const { action, data } = this.props;
    switch (radio) {
      case 1:
        data.sort((a, b) => a.rollno - b.rollno);
        break;
      case 2:
        data.sort((a, b) => a.name > b.name);
        break;
      case 3:
        data.sort((a, b) => a.marks - b.marks);
        break;
      default:
        break;
    }
    this.setState({ showModal: false });
    action(false);
  }

  render() {
    const { showModal, radio } = this.state;
    const isValid = radio > 0;
    return (
      <Modal show={showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Sort Records</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container sort_by">
            <MDBFormInline>
              <MDBInput
                onClick={this.onClick(1)}
                checked={radio === 1}
                label="Sort by Roll No"
                type="radio"
                id="radio1"
              />
              <MDBInput
                onClick={this.onClick(2)}
                checked={radio === 2}
                label="Sort by Name"
                type="radio"
                id="radio2"
              />
              <MDBInput
                onClick={this.onClick(3)}
                checked={radio === 3}
                label="Sort by Marks"
                type="radio"
                id="radio3"
              />
            </MDBFormInline>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
          <Button onClick={this.sortRecord} disabled={!isValid}>Sort</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SortBy;

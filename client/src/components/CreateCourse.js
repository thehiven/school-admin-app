import React, { Component } from 'react';
import { handleInputChange, handleCancel, handleRequestFailure, ValidationError } from '../utils/Utils';
import Axios from 'axios';

export default class CreateCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: 'Course description...',
      estimatedTime: '',
      materialsNeeded: '',
      validationError: ''
    };
    
    this.handleInputChange = handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = handleCancel.bind(this);
  }

  // request to create course
  // on success redirects to index page
  // on failure displays validation errors
  handleSubmit(event) {
    event.preventDefault();
    Axios.post('http://localhost:5000/api/courses', this.state, {
      auth: {
        username: this.props.authStatus.user.emailAddress,
        password: this.props.authStatus.user.password
      }
    })
      .then(response => {
        console.log(response);
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        handleRequestFailure.call(this, error.response.data.message);
      });
  }

  render() {
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <ValidationError message={this.state.validationError} />
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={this.state.title} onChange={this.handleInputChange}></input></div>
                <p>By {this.props.authStatus.user.firstName} {this.props.authStatus.user.lastName}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" value={this.state.description} onChange={this.handleInputChange}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={this.state.estimatedTime} onChange={this.handleInputChange}></input></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" value={this.state.materialsNeeded} onChange={this.handleInputChange}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Create Course</button>
              <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
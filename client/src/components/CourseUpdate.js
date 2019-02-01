import React, { Component } from 'react';
import { handleCancel, handleRequestFailure, ValidationError } from '../utils/Utils';
import { axiosGetCourse } from './CourseDetails';
import Axios from 'axios';

export default class CourseUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseLoaded: false,
      course: {
        _id: '',
        user: {},
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: ''
      },
      ValidationError: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCancel = handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axiosGetCourse.call(this, this.props.match.params.id);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(state => ({
      course: {
        _id: state.course._id,
        user: state.course.user,
        title: name === 'title' ? value : state.course.title,
        description: name === 'description' ? value : state.course.description,
        estimatedTime: name === 'estimatedTime' ? value : state.course.estimatedTime,
        materialsNeeded: name === 'materialsNeeded' ? value : state.course.materialsNeeded
      },
      validationError: ''
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    Axios.put(`http://localhost:5000/api/courses/${this.state.course._id}`, this.state.course, {
      auth: {
        username: this.props.authStatus.user.emailAddress,
        password: this.props.authStatus.user.password
      }
    })
    .then(response => {
      this.props.history.push(`/courses/${this.state.course._id}`);
    })
    .catch(error => {
      console.log(error);
      handleRequestFailure.call(this, error.response.data.message);
    })
  }
  
  render() {
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <ValidationError message={this.state.validationError} />
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input"
                    value={this.state.course.title} onChange={this.handleInputChange}></input></div>
                <p>By { this.state.courseLoaded ? `${this.state.course.user.firstName} ${this.state.course.user.lastName}` : '' } </p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" value={this.state.course.description} onChange={this.handleInputChange}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                           value={this.state.course.estimatedTime} onChange={this.handleInputChange}></input></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" value={this.state.course.materialsNeeded} onChange={this.handleInputChange}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Update Course</button>
              <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
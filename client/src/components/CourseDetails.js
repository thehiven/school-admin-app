import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import ReactMarkdown from 'react-markdown';

// gets course by id and stores it in bound object's state
// has to be bound to work properly
export function axiosGetCourse(courseID) {
  Axios.get(`http://localhost:5000/api/courses/${courseID}`)
    .then(response => {
      this.setState({
        courseLoaded: true,
        course: response.data.course
      });
    })
    .catch(error => console.log(error));
}

// stateless component that renders course navigation depending on auth status
const CourseNavigation = (props) => {
  return (
    <div className="actions--bar">
      <div className="bounds">
        <div className="grid-100">
            {/* if there's an authentificated user and that user is the owner display owner functionality */}
            {props.courseOwner ? (
              <span>
                <Link as="a" className="button" to={`/courses/${props.courseID}/update`}>Update Course</Link>
                <button className="button" onClick={props.deleteCallback}>Delete Course</button>
              </span>
            ) : null}
          <Link as='a' className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
    </div>
  );
};

export default class CourseDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseLoaded: false,
      course: {}
    };

    this.deleteCourse = this.deleteCourse.bind(this);
  }

  componentDidMount() {
    axiosGetCourse.call(this, this.props.match.params.id);
  }
  
  // delete request
  // after success redirects back to index page
  deleteCourse() {
    Axios.delete(`http://localhost:5000/api/courses/${this.state.course._id}`, {
      auth: {
        username: this.props.authStatus.user.emailAddress,
        password: this.props.authStatus.user.password
      }
    })
    .then(response => {
      this.props.history.push('/');
    })
    .catch(error => console.log(error));
  }

  render() {
    const {title, user, description, estimatedTime, materialsNeeded} = this.state.course;
    return (
      <div>
        {/* try to check for owner only after course is loaded */}
        {this.state.courseLoaded && <CourseNavigation courseOwner={this.props.authStatus.user._id === user._id} courseID={this.state.course._id} deleteCallback={this.deleteCourse} />}
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>By {this.state.courseLoaded ? `${user.firstName} ${user.lastName}` : ''}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
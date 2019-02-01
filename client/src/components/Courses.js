import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Course = (props) => {
  return (
    <div className="grid-33">
      <Link as="a" className="course--module course--link" to={`/courses/${props.id}`}>
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{props.title}</h3>
      </Link>
    </div>
  );
};

const CreateCourseButton = (props) => {
  return (
    <div className="grid-33">
      <Link as="a" className="course--module course--add--module" to="/courses/create">
        <h3 className="course--add--title">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </h3>
      </Link>
    </div>
  );
}

export default class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseCount: 0,
      courses: []
    };
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/api/courses')
      .then(result => {
        this.setState({
          courseCount: result.data.courseCount,
          courses: result.data.courses
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <div className="bounds">
          {this.state.courses.map(course => {
            return <Course key={course._id} id={course._id} title={course.title} />
          })}
          <CreateCourseButton />
        </div>
      </div>
    );
  }
}
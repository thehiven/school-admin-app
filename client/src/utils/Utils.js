import React from 'react';

export function handleInputChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}

export function handleCancel(event) {
  event.preventDefault();
  this.props.history.push('/');
}

export function handleRequestFailure(message) {
  this.setState({
    validationError: message
  });
} 

export const ValidationError = (props) => {
  if (props.message) {
    return (
      <div>
        <div className="validation-errors">
          <ul>
            <li>{props.message}</li>
          </ul>
        </div>
      </div>
    );  
  } else {
    return null;
  }
};
import React from 'react';

// handles inputs for multiple input fields
// including textareas
// must be bound to work properly
export function handleInputChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}

// handles cancel requests on forms
export function handleCancel(event) {
  event.preventDefault();
  this.props.history.push('/');
}

// handles failure while submting information to a server
// sets validationError on bound object's state 
export function handleRequestFailure(message) {
  this.setState({
    validationError: message
  });
} 

// stateless component used to render validation errors
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
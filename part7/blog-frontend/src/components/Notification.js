import React from 'react'
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    const variant = {
      success: "success",
      error: "danger"
    }
    return (
      <Alert variant={variant[message.status] || "info"}>
        {message.content}
      </Alert>
    )
  }

Notification.propTypes = {
    message: PropTypes.shape({
        content: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    })
};

export default Notification
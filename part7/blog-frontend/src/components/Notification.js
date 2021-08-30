import React from 'react'
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={message.status}>
        {message.content}
      </div>
    )
  }

Notification.propTypes = {
    message: PropTypes.shape({
        content: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    })
};

export default Notification
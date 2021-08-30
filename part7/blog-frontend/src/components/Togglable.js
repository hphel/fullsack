import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {    return {      toggleVisibility    }  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <div>{props.children}</div>
        <Button variant="secondary" onClick={toggleVisibility}>{props.cancelLabel || 'cancel'}</Button>
      </div>
    </div>
  )
})
export default Togglable
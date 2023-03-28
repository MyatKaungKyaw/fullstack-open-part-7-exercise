import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props,ref) => {
  const [visible, setVisible] = useState(false)

  const cancelText = props.cancelText ? props.cancelText : 'cancel'

  const show = (e) => {
    setVisible(true)
  }

  const hide = (e) => {
    setVisible(false)
  }

  useImperativeHandle(ref,() => {
    return { hide }
  })

  return (
    <div>
      {!visible && <button onClick={show}>{props.text}</button>}
      {visible && <div>
        {props.children}
        <button onClick={hide}>{cancelText}</button>
      </div>}
    </div>
  )
})

Togglable.propTypes = {
  cancelText:PropTypes.string,
  text:PropTypes.string.isRequired,
  children:PropTypes.element.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
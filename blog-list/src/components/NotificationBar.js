import PropTypes from 'prop-types'

const NotificationBar = ({ message, isErr }) => {
  if (message === null) return null
  return (
    <div className={isErr ? 'err-notification-top-bar' : 'notification-top-bar'}>
      <p>{message}</p>
    </div>
  )
}

NotificationBar.propTypes = {
  message: PropTypes.string,
  isErr: PropTypes.bool.isRequired
}

export default NotificationBar
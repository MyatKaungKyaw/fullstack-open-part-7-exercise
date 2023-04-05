import PropTypes from "prop-types";
import { useMessageValue } from "../contexts/MessageContext";

const NotificationBar = () => {
  const messageValue = useMessageValue()
  const message = messageValue.message
  const isErr = messageValue.isErrMsg
  if (message === null) return null;
  return (
    <div
      className={isErr ? "err-notification-top-bar" : "notification-top-bar"}
    >
      <p>{message}</p>
    </div>
  );
};

export default NotificationBar;

import { useMessageValue } from "../contexts/MessageContext";
import { Alert } from '@mui/material'

const NotificationBar = () => {
  const messageValue = useMessageValue()
  const message = messageValue.message
  if (message === null) return null;
  return (
    <Alert>
      <p>{message}</p>
    </Alert>
  );
};

export default NotificationBar;

import NotificationBar from "./NotificationBar";
import { useMessageValue } from "../contexts/MessageContext";
const Main = (props) => {
  const message = useMessageValue().message
    return (
        <>
        <NotificationBar/>
        <div className={message !== null ? "show-notification-position" : ""}>
          {props.children}
        </div>
      </>
    )
}

export default Main
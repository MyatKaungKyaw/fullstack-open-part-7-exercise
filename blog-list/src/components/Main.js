import NotificationBar from "./NotificationBar";

const Main = (props) => {
    return (
        <>
        <NotificationBar/>
        <div className={props.message !== null ? "show-notification-position" : ""}>
          {props.children}
        </div>
      </>
    )
}

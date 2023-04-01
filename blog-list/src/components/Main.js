import NotificationBar from "./NotificationBar";

const Main = (props) => {
  return (
    <>
      <NotificationBar />
      <div className={message !== null ? "show-notification-position" : ""}>
        {props.children}
      </div>
    </>
  );
};

export default Main;

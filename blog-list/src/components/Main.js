import NotificationBar from "./NotificationBar";

const Main = (props) => {
  return (
    <div>
    <div>here</div>
      <NotificationBar />
      {/* <div className={message !== null ? "show-notification-position" : ""}> */}
      <div className={"show-notification-position"}>
        {props.children}
      </div>
    </div>
  );
};

export default Main;

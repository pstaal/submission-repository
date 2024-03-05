const Notification = (props) => {
  let { content, error } = props.message;
  if (content === null) {
    return null;
  } else if (error) {
    return <div className="notification error">{content}</div>;
  } else {
    return <div className="notification">{content}</div>;
  }
};

export default Notification;

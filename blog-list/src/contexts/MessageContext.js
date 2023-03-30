import { createContext, useContext, useReducer } from "react";

const messageReducer = (state, action) => {
  switch (action.type) {
    case "updateMessage": {
      return {
        ...state,
        message: action.message,
      };
    }
    case "updateErrStatus": {
      return {
        ...state,
        isErrMsg: !state.isErrMsg,
      };
    }
    case "reset": {
      return {
        message: null,
        isErrMsg: false,
      };
    }
    default:
      throw Error("unknow action : ", action.type);
  }
};

const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, {
    message: null,
    isErrMsg: false,
  });
  return (
    <MessageContext.Provider data={[message, messageDispatch]}>
      {props.children}
    </MessageContext.Provider>
  );
};

export const useMessageValue = () => useContext(MessageContext)[0];

export const useMessageDispatch = () => useContext(MessageContext)[1];

export default MessageContext;

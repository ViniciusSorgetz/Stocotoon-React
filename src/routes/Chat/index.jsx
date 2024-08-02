import React from "react";

import ChatProvider from "../../contexts/ChatContext";
import Chat from "./Chat";

const App = () => {
  return (
    <ChatProvider>
      <Chat/>
    </ChatProvider>
  );
};

export default App;

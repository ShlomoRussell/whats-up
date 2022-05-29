import React from "react";
import Login from "./components/Login";
import { SocketProvider } from "./context/SocketProvider";

function App() {
  return <SocketProvider><Login /></SocketProvider>;
}

export default App;

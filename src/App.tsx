import "react-native-gesture-handler";
import React from "react";
import Routes from "./routes";

import AppProvider from "./hooks";
import { receiveNotifications } from "./utils/getTokenNotification";
import { View } from "react-native";

const App: React.FC = () => {
  receiveNotifications();
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;

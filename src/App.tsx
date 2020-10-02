import "react-native-gesture-handler";
import React from "react";
import Routes from "./routes";

import AppProvider from "./hooks";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;

import React from "react";
import { View, ActivityIndicator } from "react-native";
import AuthRoutes from "./auth.routes";
import PrivateRoutes from "./private.routes";

import { useAuth } from "../hooks/auth";

import { colors } from "../styles/colors";

const routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.azul} />
      </View>
    );
  }
  return user ? <PrivateRoutes /> : <AuthRoutes />;
};

export default routes;

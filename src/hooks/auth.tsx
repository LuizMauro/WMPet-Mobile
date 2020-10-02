import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-community/async-storage";
import api from "../services/api";

interface User {
  id: string;
  name: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInRequest {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  singIn(data: SignInRequest): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        "WMPET: token",
        "WMPET: user",
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }

    loadStorageData();
  });

  const singIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/session", {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ["WMPET: token", token],
      ["WMPET: user", JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token[1]}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(["WMPET: token", "WMPET: user"]);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, singIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Precisa do Provider em volta");
  }

  return context;
}

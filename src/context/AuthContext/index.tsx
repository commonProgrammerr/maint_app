import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { api, UserAuthDTO } from "../../services/api";
import genId from "../../utils/genID";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  photo?: string;
  grupe_id?: string;
}

type AuthSubmitData = {
  login: string;
  password: string;
};

interface AuthContextType {
  user: User;
  logout: () => void;
  login: (data: AuthSubmitData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const userStorageKey = "@miimo_expo:user";

async function handleAuth(data: AuthSubmitData) {
  console.log(data);
  const response = await api.post<UserAuthDTO>("/auth/", {
    usr_log: data.login,
    usr_pass: data.password,
  });

  console.log(response.data);
  return response.data;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  const handleLogin = useCallback<AuthContextType["login"]>(async (data) => {
    try {
      const userDTO = await handleAuth(data);

      const userInfo: User = {
        id: userDTO.usr_id,
        name: userDTO.usr_name,
        photo: undefined,
        grupe_id: userDTO.usr_grupo,
      };

      setUser(userInfo);
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo));
    } catch (error) {
      Alert.alert("Não foi possivel efetuar o login!");
      console.error(error);
      throw error as Error;
    }
  }, []);

  async function handleLogout() {
    try {

      await AsyncStorage.setItem(userStorageKey, JSON.stringify({} as User));
      setUser({} as User);
    } catch (error) {
      Alert.alert("Não foi possivel fazer o logout!");
      console.error(error);
      throw error as Error;
    }
  }

  useEffect(() => {
    async function loadUserStorageDate() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }
    }

    loadUserStorageDate();
  }, []);

  useEffect(() => console.log("render", "auth"));

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("This hook, must be used inside a 'AuthContextProvider'!");
  }

  return context;
}

export function useAuthUser() {
  return useAuth().user;
}
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  EffectCallback,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { api, MAINT_URL, UserAuthDTO } from "../../services/api";
import genId from "../../utils/genID";
import axios from "axios";
import { LoadingSplash } from "../../components/LoadingSplash";

interface AuthProviderProps {
  children: ReactNode;
  loaded?: boolean;
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
  const url = `${MAINT_URL}/auth/`;
  const response = await axios.post<UserAuthDTO>(url, {
    usr_log: data.login,
    usr_pass: data.password,
  });

  return response.data;
}

export function AuthProvider({ children, loaded }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  const handleLogin = useCallback<AuthContextType["login"]>(async (data) => {
    try {
      const userDTO = await handleAuth(data);

      const userInfo: User = {
        id: userDTO.usr_id,
        name: userDTO.usr_name,
        photo: undefined,
        grupe_id: encodeURI(userDTO.usr_empresa).toLowerCase(),
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
      setLoading(true);
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }
      setLoading(false);
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
      {loaded && !loading ? children : <LoadingSplash />}
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

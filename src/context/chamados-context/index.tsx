import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import axios, { AxiosResponse } from "axios";
import { api, FeedDTO, SearchDTO, SOCKET_BASE_URL } from "../../services/api";
import { useAuth } from "../AuthContext";

interface ContextType {
  loadFeed(page?: number): Promise<AxiosResponse<FeedDTO>>;
  getOccurenceData(id: string): Promise<AxiosResponse<SearchDTO>>;
}
interface ProviderProps {
  children: ReactNode;
}

const OccurrencesContext = createContext<ContextType | null>(null);

export function OccurrencesProvider({ children }: ProviderProps) {
  const { user } = useAuth();

  const handleLoadFeed = async (page = 1) => {
    return api.post<FeedDTO>("/feed/", {
      usr_id: "1",
      pag: page,
    });
  };

  const getOccurenceData = async (id: string) =>
    api.post<SearchDTO>("/search/", {
      // usr_id: user.id,
      oc_id: id,
    });

  return (
    <OccurrencesContext.Provider
      value={{
        loadFeed: handleLoadFeed,
        getOccurenceData,
      }}
    >
      {children}
    </OccurrencesContext.Provider>
  );
}

export function useOccurrencesContext() {
  const context = useContext(OccurrencesContext);

  if (!context) {
    throw new Error(
      "This hook, must be used inside a 'ChamadosContextProvider'!"
    );
  }

  return context;
}

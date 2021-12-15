import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
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
    return api.post<FeedDTO>("/events/feed/", {
      page,
      zone_id: user.grupe_id,
    });
  };

  const getOccurenceData = async (id: string) =>
    api.post<SearchDTO>("/events/search/", {
      id,
    });

  useEffect(() => console.log("render", "chamados"));

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

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useAsync } from "react-async-hook";
import * as Notifications from "expo-notifications";

import { api, FeedItem, FeedDTO, SOCKET_BASE_URL } from "../../services/api";
import { useSocket } from "../../context/SocketContext";
import { useOccurrencesContext } from "../../context/chamados-context";
import { OccurrencesType2String } from "../chamados-context/types";

interface FeedProviderProps {
  children: ReactNode;
}

interface FeedContextType {
  feed: FeedItem[];
  loadNextFeedPage: () => Promise<void>;
  reloadFeed: () => Promise<void>;
  loading: boolean;
  error?: Error;
}

const feedContext = createContext<FeedContextType | null>(null);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

(async () => {
  await Notifications.setNotificationChannelAsync("new-ocurrences", {
    name: "Maint Ocurrences",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "default",
    vibrationPattern: [0, 200, 200, 100, 200, 200, 100, 60, 30],
  });
})();

async function schedulePushNotification(data: FeedItem) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Nova ocorrencia! ⏰",
      body: `${OccurrencesType2String(data.type)} em ${data.local}`,
      data: {},
    },
    trigger: { seconds: 2, channelId: "new-ocurrences" },
  });
}

export function FeedProvider({ children }: FeedProviderProps) {
  const { loadFeed } = useOccurrencesContext();
  const feedPage = useAsync(async () => (await loadFeed())?.data, []);
  const feed = feedPage.result?.feed || ([] as FeedItem[]);
  
  useEffect(() => console.log('render', 'feed'))
  
  useSocket((io) => {
    io?.on("@event:new", handleAddItem);
    io?.on("@event:close", handleRemoveItem);
    return () => {
      io?.removeListener("@event:new", handleAddItem);
      io?.removeListener("@event:close", handleRemoveItem);
    };
  });

  function handleAddItem(data: FeedItem) {
    console.log("@event:new\n", data.id);
    if (!feed.find((item) => item.id === data.id)) {
      schedulePushNotification(data);
      feedPage.set({
        ...feedPage,
        result: {
          page: feedPage.result?.page,
          feed: [data, ...feed],
        },
      });
    }
  }
  function handleRemoveItem(data: FeedItem) {
    console.log("@event:close\n", data.id);
    if (!feed.find((item) => item.id === data.id)) {
      feedPage.set({
        ...feedPage,
        result: {
          page: feedPage.result?.page,
          feed: feed.filter((item) => item.id !== data.id),
        },
      });
    }
  }

  async function handleReloadFeed() {
    feedPage.reset();
    await feedPage.execute()
  }

  async function handleLoadNextPage() {
    await feedPage.execute();
  }
  return (
    <feedContext.Provider
      value={{
        feed,
        loading: feedPage.loading,
        error: feedPage.error,
        loadNextFeedPage: handleLoadNextPage,
        reloadFeed: handleReloadFeed,
      }}
    >
      {children}
    </feedContext.Provider>
  );
}

export function useFeed() {
  const context = useContext(feedContext);

  if (!context) {
    throw new Error("This hook, must be used inside a 'FeedContextProvider'!");
  }

  return context;
}

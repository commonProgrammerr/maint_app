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
import { OccurrencesType2String } from "../../utils/occurrences";
import { useAuthUser } from "../AuthContext";

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
    name: "Nova Ocorrencia",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "notification-sound.wav",
    vibrationPattern: [0, 200, 200, 100],
    
  });
  await Notifications.setNotificationChannelAsync("close-ocurrences", {
    name: "Ocorrencia encerrada",
    sound: "none",
    importance: Notifications.AndroidImportance.LOW,
  });
})();

async function scheduleNewEventPushNotification(data: FeedItem) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Nova ocorrencia! ⏰",
      body: `${OccurrencesType2String(data.type)} em ${data.local}`,
      data: {},
    },
    trigger: { seconds: 1, channelId: "new-ocurrences" },
  });
}
async function scheduleCloseEventPushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Ocorrencia fechada!",
      sound: false,
      body: "Ocorrencia fechada! O relátorio enviado está em analise.",
      data: {},
    },
    trigger: { seconds: 1, channelId: "close-ocurrences" },
  });
}

export function FeedProvider({ children }: FeedProviderProps) {
  const { grupe_id } = useAuthUser();
  const page = useAsync(async () => {
    return (
      await api.post<FeedDTO>("/events/feed/", {
        zone_id: grupe_id,
      })
    ).data;
  }, []);

  const feedPage = page.result?.feed || ([] as FeedItem[]);
  const [feed, setFeed] = useState([] as FeedItem[]);

  useEffect(() => console.log("render", "feed"));
  useEffect(() => {
    if (page.loading) return;

    setFeed([...feed, ...feedPage]);
  }, [page.loading]);

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
      scheduleNewEventPushNotification(data);
      setFeed((last) => [data, ...last]);
    }
  }
  const handleRemoveItem = useCallback((data: FeedItem) => {
    scheduleCloseEventPushNotification();
    console.log("@event:close\n", data.id);
    setFeed((feed) => feed.filter((item) => item.id !== data.id));
  }, []);

  const handleReloadFeed = useCallback(async () => {
    setFeed([]);
    await page.execute();
  }, []);

  const handleLoadNextPage = useCallback(async () => {
    await page.execute();
  }, []);

  return (
    <feedContext.Provider
      value={{
        feed: feed,
        loading: page.loading,
        error: page.error,
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

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
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { database } from "../../database";
// import { Event } from "../../database/models/event";

interface FeedProviderProps {
  children: ReactNode;
}

interface FeedContextType {
  feed: FeedItem[];
  loadNextFeedPage: () => Promise<void>;
  reloadFeed: () => Promise<void>;
  loading: boolean;
  error?: Error;
  clear: () => void;
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
function removeCopy<T>(arr: T[], cb: (a: T, b: T) => boolean): T[] {
  return arr.filter((item, i) => {
    return !arr.slice(i + 1).find((it) => cb(item, it));
  });
}

export function FeedProvider({ children }: FeedProviderProps) {
  const { grupe_id } = useAuthUser();
  const page = useAsync(
    async (page: number) => {
      // const colection = database.get("events");
      // const users = (await colection.query().fetch()) as Event[];

      // console.log("users", users);
      return (
        await api.post<FeedDTO>("/events/feed/", {
          page,
          zone_id: grupe_id,
        })
      ).data;

      // return {
      //   page: 0,
      //   feed: users.map<FeedItem>((ev) => ({
      //     id: ev.online_id,
      //     local: ev.local,
      //     piso: ev.piso,
      //     type: ev.type,
      //   })),
      // } as FeedDTO;
    },
    [1]
  );

  const feedPage = page.result?.feed || ([] as FeedItem[]);
  const [feed, setFeed] = useState([] as FeedItem[]);

  useEffect(() => {
    (async () => {
      const feedStoraged = await AsyncStorage.getItem("@miimo_expo:feed");
      if (feedStoraged) {
        const feedData = JSON.parse(feedStoraged) as FeedItem[];
        setFeed((last) =>
          removeCopy([...last, ...feedData], (a, b) => a.id === b.id)
        );
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(
        "@miimo_expo:feed",
        JSON.stringify(removeCopy(feed, (a, b) => a.id === b.id))
      );
      console.log(feed);
    })();
  }, [feed]);

  useEffect(() => console.log("render", "feed"));
  useEffect(() => {
    if (page.loading) return;

    const newFeed = [...feed, ...feedPage];
    console.log({
      grupe: grupe_id,
      feed: newFeed,
    });
    setFeed(newFeed);
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
    if (!page.loading && !page.error) {
      setFeed([]);
      await page.execute(1);
    }
  }, [page]);

  const handleLoadNextPage = useCallback(async () => {
    if (!page.loading && !page.error && page.result?.feed.length) {
      await page.execute((page.result?.page ?? 1) + 1);
    }
  }, [page]);

  return (
    <feedContext.Provider
      value={{
        feed: removeCopy(feed, (a, b) => a.id === b.id).sort(
          (a, b) => a.type - b.type
        ),
        loading: page.loading,
        error: page.error,
        loadNextFeedPage: handleLoadNextPage,
        reloadFeed: handleReloadFeed,
        clear: () => setFeed([]),
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

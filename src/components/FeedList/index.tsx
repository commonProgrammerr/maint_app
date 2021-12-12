import * as Notifications from "expo-notifications";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";

import { useSocket } from "../../context/SocketContext";
import { FeedItem, SOCKET_BASE_URL } from "../../services/api";
import { useOccurrencesContext } from "../../context/chamados-context";
import { FeedDTO } from "../../services/api";
import genId from "../../utils/genID";

import OccurrenceCard from "../OccurrenceCard";

import { Container, Label, ListaDeChamados } from "./styles";
import { LoadIndicator } from "../LoadIndicator";
import { useAsync } from "react-async-hook";

interface FeedListProps {
  handleOpenModal: (id: string) => void;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

(async () => {
  await Notifications.setNotificationChannelAsync("new-ocurrences", {
    name: "Maint Ocurrences",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "email-sound.wav",
  });
})();

async function schedulePushNotification(data: any) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Nova ocorrencia! ⏰",
      body: `${type2String(data.type)} em ${data.local}`,
      data: {},
    },
    trigger: { seconds: 2, channelId: "new-ocurrences" },
  });
}

function type2String(type: number) {
  switch (type) {
    case 1:
      return "Entupimento";

    case 2:
      return "Pedido de apoio";

    default:
      return "???????";
  }
}

export function FeedsList({ handleOpenModal }: FeedListProps) {
  const { loadFeed } = useOccurrencesContext();
  const feedPage = useAsync(async () => (await loadFeed()).data, []);
  const [feed, setFeed] = useState([] as FeedItem[]);

  useSocket((io) => {
    io?.on("update-feed:new_request", handleUpdateFeed);
    io?.on("update-feed:remove", handleCleanFeed);
    return () => {
      io?.removeListener("update-feed:new_request", handleUpdateFeed);
      io?.removeListener("update-feed:remove", handleCleanFeed);
    };
  });

  function handleUpdateFeed(data: FeedItem) {
    console.log("update-feed:\n", data);
    schedulePushNotification(data);
    if (!feed.find((item) => item.id === data.id)) {
      setFeed((feed) => [data, ...feed]);
    }
  }
  function handleCleanFeed(data: {id: string}) {
    
    if (!feed.find((item) => item.id === data.id)) {
      console.log("removed-from-feed: ", data.id);
      setFeed((feed) => feed.filter(item => item.id !== data.id));
    }
  }

  if(feedPage.loading)
    return <LoadIndicator loading={feedPage.loading} />

  return (
    <Container>
      <Label>Chamados</Label>
      <ListaDeChamados
        data={feedPage.loading ? feed : [...feed, ...feedPage!.result!.feed]}
        renderItem={({ item }) => (
          <OccurrenceCard
            data={item as FeedItem}
            onPress={() => handleOpenModal((item as FeedItem).id)}
          />
        )}
        keyExtractor={genId}
        showsHorizontalScrollIndicator={false}
        // onEndReached={handleLoadFeed}
        // onEndReachedThreshold={0.13}
        refreshing={feedPage.loading}
        onRefresh={feedPage.execute}

        // ListFooterComponent={styled(LoadIndicator).attrs({ loading })``}
      />
    </Container>
  );
}

import React, { useEffect, useState } from "react";

import { FeedItem } from "../../services/api";
import genId from "../../utils/genID";

import OccurrenceCard from "../OccurrenceCard";
import { Container, Label, ListaDeChamados } from "./styles";
import { LoadIndicator } from "../LoadIndicator";
import { useFeed } from "../../context/FeedContext";
import { SectionList } from "react-native";
import { grupeBy } from "../../utils/grupeBy";
import EnptyFeed from "./EnptyFeed";
import { useNetworkContext } from "../../context/NetworkContext";
interface FeedListProps {
  handleOpenModal: (id: string) => void;
}

const day_milis = 24 * 60 * 60 * 1000;
export function FeedsList({ handleOpenModal }: FeedListProps) {
  const { loading, feed, reloadFeed, loadNextFeedPage } = useFeed();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const now = new Date();

  const { isConnected } = useNetworkContext();

  const grupedField = grupeBy(isConnected ? feed : [], (item) => {
    const item_date = item.time ? new Date(item.time) : now;
    const timeDif = item_date.getTime() - now.getTime();
    const day = ("" + item_date.getDate()).padStart(2, "0");
    const month = String(item_date.getMonth() + 1).padStart(2, "0");
    const year = item_date.getFullYear();

    return Math.abs(timeDif) < day_milis
      ? "Hoje"
      : Math.abs(timeDif) < day_milis * 2
      ? timeDif < 0
        ? "Ontem"
        : "Amanhã"
      : `${day}/${month}/${year}`;
  });

  function handleRefresh() {
    if (!loading && !isRefreshing) {
      setIsRefreshing(true);
      reloadFeed();
    }
  }

  useEffect(() => {
    if (!loading && isRefreshing) {
      setIsRefreshing(false);
    }
  }, [loading]);

  if (isRefreshing) return <LoadIndicator loading />;

  return (
    <Container>
      {/* <Label>Atividades</Label> */}
      <ListaDeChamados
        sections={Object.keys(grupedField)
          .sort((a) => {
            switch (a) {
              case "Amanhã":
                return -1;
              case "Ontem":
                return -2;
              case "Hoje":
                return -10;
              default:
                const num = a.split("/").map(Number);
                return (
                  now.getTime() - new Date(num[0], num[1], num[2]).getTime()
                );
            }
          })
          .map((title) => ({
            title,
            data: grupedField[title],
          }))}
        renderSectionHeader={({ section }) => (
          <Label>{(section as any).title}</Label>
        )}
        renderItem={({ item }) => (
          <OccurrenceCard
            data={item as FeedItem}
            onPress={() => handleOpenModal((item as FeedItem).id)}
          />
        )}
        isEmpty={feed.length <= 0}
        keyExtractor={genId}
        showsHorizontalScrollIndicator={false}
        onEndReached={loadNextFeedPage}
        onEndReachedThreshold={0.13}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        stickySectionHeadersEnabled
        ListEmptyComponent={EnptyFeed}
        ListFooterComponent={() => (
          <LoadIndicator style={{ marginVertical: 6 }} loading={loading} />
        )}
      />
    </Container>
  );
}

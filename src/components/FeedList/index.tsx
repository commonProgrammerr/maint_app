import React, { useEffect, useState } from "react";

import { FeedItem } from "../../services/api";
import genId from "../../utils/genID";

import OccurrenceCard from "../OccurrenceCard";
import { Container, Label, ListaDeChamados } from "./styles";
import { LoadIndicator } from "../LoadIndicator";
import { useFeed } from "../../context/FeedContext";
import { SectionList } from "react-native";
import { grupeBy } from "../../utils/grupeBy";
interface FeedListProps {
  handleOpenModal: (id: string) => void;
}

const day_milis = 24 * 60 * 60 * 1000;
export function FeedsList({ handleOpenModal }: FeedListProps) {
  const { loading, feed, reloadFeed, loadNextFeedPage } = useFeed();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const grupedField = grupeBy(feed, (item) => {
    const item_date = item.time ? new Date(item.time) : new Date();
    const today = new Date();
    const time_dif = item_date.getTime() - today.getTime();
    const day = ("" + item_date.getDate()).padStart(2, "0");
    const month = String(item_date.getMonth() + 1).padStart(2, "0");
    const year = item_date.getFullYear();

    return Math.abs(time_dif) < day_milis
      ? time_dif < 0
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
              case "Ontem":
                return -1;
              case "Hoje":
                return -10;
              default:
                return 0;
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
        keyExtractor={genId}
        showsHorizontalScrollIndicator={false}
        onEndReached={loadNextFeedPage}
        onEndReachedThreshold={0.13}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        stickySectionHeadersEnabled
        ListFooterComponent={() => (
          <LoadIndicator style={{ marginVertical: 6 }} loading={loading} />
        )}
      />
    </Container>
  );
}

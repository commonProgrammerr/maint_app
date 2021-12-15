import React from "react";

import { FeedItem } from "../../services/api";
import genId from "../../utils/genID";

import OccurrenceCard from "../OccurrenceCard";
import { Container, Label, ListaDeChamados } from "./styles";
import { LoadIndicator } from "../LoadIndicator";
import { useFeed } from "../../context/FeedContext";

interface FeedListProps {
  handleOpenModal: (id: string) => void;
}

export function FeedsList({ handleOpenModal }: FeedListProps) {
  const {
    loading,
    feed,
    reloadFeed
  } = useFeed()

  if (loading) return <LoadIndicator loading={loading} />;

  return (
    <Container>
      <Label>Chamados</Label>
      <ListaDeChamados
        data={feed}
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
        refreshing={loading}
        onRefresh={reloadFeed}
        // ListFooterComponent={styled(LoadIndicator).attrs({ loading })``}
      />
    </Container>
  );
}

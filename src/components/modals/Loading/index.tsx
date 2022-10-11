import React from "react";
import Modal from "react-native-modal";

import { LoadIndicator } from "../../LoadIndicator";
import { Container } from "./styles";
interface LoadingModalProps {
  visible: boolean;
  onRequestClose: () => void;
}

export function LoadingModal({ visible, onRequestClose }: LoadingModalProps) {
  return (
    <Modal isVisible={visible} onDismiss={onRequestClose}>
      <Container>
        <LoadIndicator loading />
      </Container>
    </Modal>
  );
}

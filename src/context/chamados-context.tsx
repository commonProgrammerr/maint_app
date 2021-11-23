import React, { createContext, ReactNode, useContext, useState } from "react";
import AceptCallModal from "../components/AceptCallModal";

export interface ChamadoType {
  id: string;
  piso: string;
  local: string;
  box: number;
  time: string;
  image_url?: string;
  description: string;
  status?: string
}

interface ContextType {
  chamadosAtivos: ChamadoType[];
  getChamadoData(id: string): ChamadoType | undefined;
  openChamadoModal(id: string): void
}
const chamadosContext = createContext<ContextType | null>(null);

interface ChamadosContextProps {
  children: ReactNode;
}

export function ChamadosContextProvider({ children }: ChamadosContextProps) {
  const [chamadosAtivos, setChamadosAtivos] = useState<ChamadoType[]>([{
    box: 2,
    description: 'Alert',
    local: 'dasdas',
    piso: 'L3',
    time: '',
    id: '90e8wru0ewjfi'

  }]);
  const [modalState, setModalSate] = useState({
    isOpen: false,
    id: '',
    data: {}
  });

  function handleGetChamadoData(id:string) {
    return chamadosAtivos.find((ch) => ch.id === id)
  }

  function handleCloseModal() {
    setModalSate(oldState => ({
      ...oldState,
      isOpen: false
    }))
  }
  function handleOpenModal(id: string) {
    const chamado = handleGetChamadoData(id);

    if(!chamado) return;

    setModalSate({
      id,
      data:{ ...chamado },
      isOpen: true
    })
  }

  return (
    <chamadosContext.Provider
      value={{
        chamadosAtivos,
        getChamadoData: handleGetChamadoData,
        openChamadoModal: handleOpenModal
      }}
    >
      {children}
      <AceptCallModal
        isOpen={modalState.isOpen}
        onRequestClose={handleCloseModal}
      />
    </chamadosContext.Provider>
  );
}

export function useChamadosContext() {
  const context = useContext(chamadosContext);

  if (!context) {
    throw new Error(
      "This hook, must be used inside a 'ChamadosContextProvider'!"
    );
  }

  return context;
}

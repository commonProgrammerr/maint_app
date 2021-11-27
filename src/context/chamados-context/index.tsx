import React, { createContext, useContext, useState, ReactNode } from "react";
import { ChamadosTypes, ChamadoType } from "./types";

interface ContextType {
  chamadosAtivos: ChamadoType[];
  getChamadoData(id: string): ChamadoType | undefined;
}

interface ChamadosContextProps {
  children: ReactNode;
}

const chamadosContext = createContext<ContextType | null>(null);

export function ChamadosContextProvider({ children }: ChamadosContextProps) {
  const [chamadosAtivos, setChamadosAtivos] = useState<ChamadoType[]>([
    {
      id: "90e8wru0ewjfi",
      box: 9,
      genero: "male",
      local: "Portão H3",
      piso: "L3",
      time: "1 min 35s",
      type: ChamadosTypes.ENTUPIMENTO,
    },
    {
      id: "9we9u4508934",
      box: 9,
      genero: "male",
      local: "Portão H3",
      piso: "L3",
      time: "1 min 35s",
      type: ChamadosTypes.AJUDA,
      description: `Dicta ducimus placeat iusto delectus quo accusantium ducimus unde.
      Dicta fugiat facere tenetur consequuntur voluptas. Nesciunt ut odit.
    `,
    },
  ]);

  function handleGetChamadoData(id: string) {
    return chamadosAtivos.find((ch) => ch.id === id);
  }

  return (
    <chamadosContext.Provider
      value={{
        chamadosAtivos,
        getChamadoData: handleGetChamadoData,
      }}
    >
      {children}
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

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";

import io, { Socket } from "socket.io-client";
import { SOCKET_BASE_URL } from "../../services/api";

interface SocketContext {
  socketIO: () => Socket;
  connect: (url: string) => Promise<void>;
  disconnect?: () => Promise<void>;
}

const socketContext = createContext({} as SocketContext);
type Props = { children: ReactNode };

export function SocketProvider({ children }: Props) {
  const socket = useRef(io(SOCKET_BASE_URL));

  return (
    <socketContext.Provider
      value={{
        socketIO: () => socket.current,
        async connect(url) {
          try {
            if (socket.current) socket.current.disconnect();
            socket.current = io(url);
            return Promise.resolve();
          } catch (err) {
            return Promise.reject(err);
          }
        },
        async disconnect() {
          try {
            if (socket.current) {
              socket.current.disconnect();
            }
            return Promise.resolve();
          } catch (err) {
            return Promise.reject(err);
          }
        },
      }}
    >
      {children}
    </socketContext.Provider>
  );
}

export function useSocket(fn?: (io: Socket) => void) {
  const context = useContext(socketContext);

  if (!context) {
    throw new Error("This hook, must be used inside a 'SocketProvider'!");
  }


  useEffect(() => {
    const cllbck = fn?.(context.socketIO());

    if (cllbck) {
      return cllbck;
    }
  }, []);
  return context;
}

import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { NetworkState, getNetworkStateAsync } from "expo-network";
import {
  createContext,
  useContext,
  useContextSelector,
} from "use-context-selector";

interface NetworkContext {
  networkState: NetworkState;
}

interface NetworkContextProviderProps {
  children: ReactNode;
  reloadTrigger?: any;
}

const context = createContext({} as NetworkContext);
const Provider = context.Provider as unknown as React.FC<{
  value: NetworkContext;
}>;

export function NetworkContextProvider({
  children,
  reloadTrigger,
}: NetworkContextProviderProps) {
  const [networkState, setState] = useState<NetworkState>({});
  useLayoutEffect(() => {
    getNetworkStateAsync().then((result) => {
      setState(result);
    });
  }, [reloadTrigger]);
  return (
    <Provider
      value={{
        networkState,
      }}
    >
      {children}
    </Provider>
  );
}

export function useNetworkContext() {
  try {
    return useContextSelector(context, (result) => {
      if (!result)
        throw new Error("This hook should be used inside of NetworkProvider");
      return result.networkState;
    });
  } catch (error) {
    throw error;
  }
}

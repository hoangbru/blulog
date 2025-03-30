"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

export type AppSetting = Record<string, string | undefined>;

type AppContextType = {
  settings: AppSetting;
  updateSetting: (key: string, value: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppSettingProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettingsState] = useState<AppSetting>({});

  const updateSetting = (key: string, value: string) => {
    setSettingsState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <AppContext.Provider value={{ settings, updateSetting }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppSetting = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppSetting must be used within an AppSettingProvider");
  }
  return context;
};

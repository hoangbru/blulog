import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

import { getProfile } from "@/actions/getProfile";
import { User } from "@/types/auth";

interface ProfileContextType {
  profile?: User;
  setProfile: Dispatch<SetStateAction<User | undefined>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<User | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("_bl_tk");
    }
    return null;
  });
  
  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem("_bl_tk"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const fetchProfile = useCallback(async () => {
    if (!accessToken) return;
    try {
      const user = await getProfile();
      setProfile(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

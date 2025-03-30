import api from "@/libs/axios";
import { User } from "@/types/auth";

export const getProfile = async (): Promise<User | undefined> => {
  const { data } = await api.get(`/api/profile`);
  return data.data.user;
};

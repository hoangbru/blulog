import api from "@/libs/axios";

export const fetcher = async (path: string) => {
  const response = await api.get(path);
  return response.data;
};

export const mutation = async (
  path: string,
  data: Record<string, unknown> = {},
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "POST"
) => {
  const config = {
    url: path,
    method,
    ...(method !== "GET" && { data }),
  };

  const response = await api(config);
  return response.data;
};

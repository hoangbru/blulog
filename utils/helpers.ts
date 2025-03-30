import api from "@/libs/axios";

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_BASE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000";

  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  return url;
};

export const toDateTime = (secs: number) => {
  const t = new Date("1970-01-01T00:30:00Z"); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const { data } = await api.post(
      "/api/refresh-token",
      {},
      { withCredentials: true }
    );

    if (!data?.data?.accessToken) {
      throw new Error("No access token received");
    }

    return data.data.accessToken;
  } catch {
    console.error("Session expired. Redirecting to login...");
    return null;
  }
};

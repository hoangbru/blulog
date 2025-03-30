import { ImageResponse } from "next/og";

// Image metadata
export const alt = process.env.NEXT_PUBLIC_APP_NAME;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {alt}
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}

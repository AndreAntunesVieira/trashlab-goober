import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css"

const MyApp: AppType = ({
  Component,
  pageProps: {  ...pageProps },
}) => {
  return (
    <Component {...pageProps} />
  );
};

export default api.withTRPC(MyApp);

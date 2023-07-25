import React from "react";
import ReactDOM from "react-dom/client";
import Panel from "@pages/panel/Panel";
import "./index.css";
import { ZstdInit } from "@oneidentity/zstd-js";
const root = ReactDOM.createRoot(document.getElementById("root")!);

ZstdInit().then(() => {
  console.log("ZstdInit done");
  root.render(
    <React.StrictMode>
      <Panel />
    </React.StrictMode>,
  );
});

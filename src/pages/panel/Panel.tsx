import React from "react";
import "@pages/panel/Panel.css";
import { Encoders } from "@pages/panel/encoders/Encoders";
import { Header } from "@pages/panel/Header";


export default function Panel(): JSX.Element {
  return (
    <div style={{ width: "100%"}}>
      <Header />
      <div className="p-6">
        <Encoders />
      </div>
    </div>
  );
}

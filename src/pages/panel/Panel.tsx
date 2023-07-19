import React, { ReactElement, useState } from "react";
import "@pages/panel/Panel.css";
import { Encoders } from "@pages/panel/encoders/Encoders";
import { Header } from "@pages/panel/Header";
export type Module = {
  displayName: string;
  component: ReactElement;
};
export const MODULES: { [key: string]: Module } = {
  ENCODER: {
    displayName: "Encoders & Compressors",
    component: <Encoders />,
  },
  FORMATTERS: {
    displayName: "Formatters",
    component: <></>,
  },
};
export const ModuleContext = React.createContext<Module>(MODULES.ENCODER);
export default function Panel(): JSX.Element {
  const [selected, setSelected] = useState(MODULES.ENCODER);

  return (
    <>
      <ModuleContext.Provider value={selected}>
        <div style={{ width: "100%" }}>
          <Header setSelected={setSelected} />
          <div className="p-6">{selected.component}</div>
        </div>
      </ModuleContext.Provider>
    </>
  );
}

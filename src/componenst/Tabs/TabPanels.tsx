import * as React from "react";
import { ReactElement } from "react";

type Props = {
  activeTabKey: string;
  panels: { key: string; panel: ReactElement }[];
};

export function TabPanels(props: Props) {
  const { panels } = props;
  return (
    <div>
      {panels.map((panel) => {
        if (panel.key === props.activeTabKey) {
          return <div key={panel.key}>{panel.panel}</div>;
        }
        return (
          <div key={panel.key} className="hidden">
            {panel.panel}
          </div>
        );
      })}
    </div>
  );
}

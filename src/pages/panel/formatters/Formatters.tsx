// @flow
import * as React from "react";
import { Tab } from "@src/componenst/Tabs/Tab";
import { TabPanels } from "@src/componenst/Tabs/TabPanels";
import {JsonTab} from "@pages/panel/formatters/JsonTab";
const TABS = {
  JSON: "JSON",
};

export function Formatters() {
  const [activeTab, setActiveTab] = React.useState(TABS.JSON);

  return (
    <div className="min-h-fit">
      <div className="tabs tabs-boxed mb-3">
        <Tab
          selected={activeTab}
          tabKey={TABS.JSON}
          setSelected={setActiveTab}
        />
      </div>

      <TabPanels
        panels={[
          { key: TABS.JSON, panel: <JsonTab /> },
        ]}
        activeTabKey={activeTab}
      />
    </div>
  );
}

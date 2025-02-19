import { useState } from "react";
import Tablist from "./TabList/TabList";
import TabContent from "./TabContent/TabContent";

const Tabs = () => {
  const [showTab, setShowTab] = useState(0);
  const handler = (index: number) => {
    setShowTab(index);
  };

  return (
    <>
      <Tablist selectedTab={showTab} setShowTab={handler} />
      <TabContent selectedTab={showTab} />
    </>
  );
};
export default Tabs;

import React from "react";
import style from "./Tablist.module.scss";
const Tablist = ({
  selectedTab,
  setShowTab,
}: {
  selectedTab: number;
  setShowTab: (index: number) => void;
}) => {
  const tabs: string[] = ["Занятие", "Материалы", "Журнал"];
  const tabsMarkup = tabs.map((el, index) => (
    <React.Fragment key={index}>
      <button
        className={selectedTab == index ? style.active : ""}
        key={index}
        onClick={() => setShowTab(index)}
      >
        {el}
      </button>
    </React.Fragment>
  ));
  return tabsMarkup;
};
export default Tablist;

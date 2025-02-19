const TabContent = ({ selectedTab }: { selectedTab: number }) => {
  const tabsContent: string[] = [
    "1Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    "2beatae natus vero omnis autem repellat maxime adipisci nesciunt quod",
    "3alias laudantium minima dolorum suscipit illum quibusdam, recusandae",
  ];
  <input />;
  return <p>{tabsContent[selectedTab]}</p>;
};
export default TabContent;

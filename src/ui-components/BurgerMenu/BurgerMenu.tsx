import { ReactComponent as Menu } from "../../assets/menuIcon.svg";
import { ReactComponent as Cancel } from "../../assets/cancelIcon.svg";
import { useContext } from "react";
import { ActiveContext } from "../../Сontext/Context";
const BurgerMenu = () => {
  const context = useContext(ActiveContext);
  return (
    <button onClick={() => context?.SetIsActive(!context.isActive)}>
      {!context?.isActive ? <Menu /> : <Cancel />}
    </button>
  );
};
export default BurgerMenu;

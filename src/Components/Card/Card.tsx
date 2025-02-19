import Button from "../Button/Button";
import style from "./Card.module.scss";
interface IProps {
  title: string;
  description: string;
  btnText: string;
  isDisabled?: boolean;
  btnType?: "primary" | "secondary";
  value: string;
}
const Card = ({
  title,
  description = "default description",
  btnText = "click",
  isDisabled,
  btnType,
  value,
}: IProps) => {
  return (
    <div className={style.card}>
      <h1>{title}</h1>
      <p>{description}</p>
      <Button btnType={btnType} isDisabled={isDisabled} value={value}>
        {btnText}
      </Button>
    </div>
  );
};
export default Card;

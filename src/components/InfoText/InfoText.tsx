import { getIconUrl } from "../../helpers/getIconUrl";
import Styles from "./info-text.module.scss";

export const InfoText: React.FC<IInfoTextProps> = ({
  textMessage,
  imageName = "smile-default.svg",
}) => {
  return (
    <div className={Styles.infoText}>
      <p>{textMessage}</p>

      <img src={getIconUrl(imageName)} alt="smile" />
    </div>
  );
};

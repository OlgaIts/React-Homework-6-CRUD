import {ContentProps} from "../Notes/Notes";
import close from "../../assets/close.png";
import styles from "./List.module.scss";

interface ListProps {
  list: ContentProps[];
  onDelete?: (item: ContentProps) => void;
}

export const List = ({onDelete, list}: ListProps) => {
  return (
    <ul className={styles.list_wrap}>
      {list.map((item) => (
        <li key={item.id} className={styles.list_item}>
          <p>{item.content}</p>

          <button
            onClick={() => onDelete?.(item.id)}
            className={`${styles.btn} ${styles.delete}`}
          >
            <img src={close} alt='close icon' className={styles.img} />
          </button>
        </li>
      ))}
    </ul>
  );
};

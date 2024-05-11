import {FormEvent, useEffect, useId, useState} from "react";
import update from "../../assets/update.png";
import close from "../../assets/close.png";
import arrow from "../../assets/right-arrow.png";
import styles from "./Notes.module.scss";

interface ContentProps {
  id?: number;
  content?: string;
}
const url = "http://localhost:7070/notes";

export const Notes = () => {
  const [form, setForm] = useState({content: ""});
  const [list, setList] = useState<ContentProps[]>([]);

  const getNotes = async () => {
    let response = await fetch(url);
    let result = await response.json();
    setList(result);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.content === "") {
      return;
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
      }),
    });
    if (response) {
      getNotes();
      setForm({content: ""});
    }
  };

  const handleFormValueChange = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {id, value} = target;
    setForm((prevForm) => ({...prevForm, [id]: value}));
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleDelete = async (id?: number) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (response) {
      getNotes();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>Notes</h1>
        <button onClick={getNotes} className={`${styles.btn} ${styles.update}`}>
          <img src={update} alt='' className={styles.img} />
        </button>
      </div>

      <ul className={styles.list_wrap}>
        {list.map((item) => (
          <li key={item.id} className={styles.list_item}>
            <p>{item.content}</p>

            <button
              onClick={() => handleDelete(item.id)}
              className={`${styles.btn} ${styles.delete}`}
            >
              <img src={close} alt='' className={styles.img} />
            </button>
          </li>
        ))}
      </ul>

      <form action='' onSubmit={handleSubmit}>
        <p>New Note</p>
        <div className={styles.input_wrap}>
          <textarea
            value={form.content}
            id='content'
            onChange={handleFormValueChange}
            className={styles.textarea}
          />
          <button className={`${styles.btn} ${styles.send}`}>
            <img src={arrow} alt='' className={styles.img} />
          </button>
        </div>
      </form>
    </div>
  );
};

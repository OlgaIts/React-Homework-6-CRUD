import {FormEvent, useEffect, useState} from "react";
import update from "../../assets/update.png";
import arrow from "../../assets/right-arrow.png";
import {List} from "../List/List";
import styles from "./Notes.module.scss";

export interface ContentProps {
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

  useEffect(() => {
    getNotes();
  }, []);

  const handleFormValueChange = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {id, value} = target;
    setForm((prevForm) => ({...prevForm, [id]: value}));
  };

  const handleDelete = async (id?: number) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (response) {
      getNotes();
    }
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

  return (
    <div className={styles.container}>
      <div className={styles.title_wrap}>
        <h1 className={styles.title}>Notes</h1>
        <button onClick={getNotes} className={`${styles.btn} ${styles.update}`}>
          <img src={update} alt='' className={styles.img} />
        </button>
      </div>

      <List onDelete={handleDelete} list={list} />

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

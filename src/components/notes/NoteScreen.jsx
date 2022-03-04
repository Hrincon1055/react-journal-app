import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// Mis componentes
import { activeNote, startDeleting } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";
// Inicio
export const NoteScreen = () => {
  // hooks
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const [values, handleInputChange, reset] = useForm(note);
  const activeId = useRef(note.id);
  // constantes
  const { title, body, url, id } = values;
  // effect
  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);
  useEffect(() => {
    dispatch(activeNote(values.id, { ...values }));
  }, [values, dispatch]);
  // funciones
  const handleDelete = () => {
    dispatch(startDeleting(id));
  };
  // render
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          className="notes__title-input"
          type="text"
          placeholder="Some awesome title"
          name="title"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          className="notes__textarea"
          placeholder="What happened today?"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>
        {url && (
          <div className="notes__image">
            <img src={note.url} alt="imagen" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

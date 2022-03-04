import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

// accineas asincronas
export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};
export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};
export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    if (!note.url) {
      delete note.url;
    }
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    dispatch(refreshNote(note.id, noteToFirestore));
    Swal.fire("Saved", note.title, "success");
  };
};
export const startUploding = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: "Uploadloading...",
      text: "Please wait...",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote));
    Swal.close();
  };
};
export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    await db.doc(`${uid}/journal/notes/${id}`).delete();
    dispatch(deleteNote(id));
  };
};
// accineas sincronas
export const activeNote = (id, nota) => {
  return {
    type: types.notesActive,
    payload: {
      id,
      ...nota,
    },
  };
};
export const setNotes = (notes) => {
  return {
    type: types.notesLoad,
    payload: notes,
  };
};
export const refreshNote = (id, note) => {
  return {
    type: types.notesUpdate,
    payload: {
      id,
      note: {
        id,
        ...note,
      },
    },
  };
};
export const deleteNote = (id) => {
  return {
    type: types.notesDelete,
    payload: id,
  };
};
export const notesLogout = () => {
  return {
    type: types.notesLogoutCleaning,
  };
};
export const addNewNote = (id, note) => {
  return {
    type: types.notesAddNew,
    payload: {
      id,
      ...note,
    },
  };
};

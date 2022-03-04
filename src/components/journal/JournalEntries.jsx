import React from "react";
import { useSelector } from "react-redux";
// Mis componentes
import { JournalEntry } from "./JournalEntry";
// Inicio
export const JournalEntries = () => {
  // hooks
  const { notes } = useSelector((state) => state.notes);
  // render
  if (notes.length === 0) {
    return <h1 style={{ color: "white" }}>Cargando...</h1>;
  }
  return (
    <div className="journal__entries ">
      {notes.map((note) => (
        <JournalEntry key={note.id} {...note} />
      ))}
    </div>
  );
};

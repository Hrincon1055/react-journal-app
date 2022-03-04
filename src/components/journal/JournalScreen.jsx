import React from "react";
import { useSelector } from "react-redux";
// Mis componentes
import { Sidebar } from "./Sidebar";
import { NothingSelected } from "./NothingSelected";
import { NoteScreen } from "../notes/NoteScreen";
// Inicio
export const JournalScreen = () => {
  // hooks
  const { active } = useSelector((state) => state.notes);
  // render
  return (
    <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
      <Sidebar />
      <main>{active ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};

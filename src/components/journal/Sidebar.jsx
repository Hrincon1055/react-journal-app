import React from "react";
import { useDispatch, useSelector } from "react-redux";
// Mis componentes
import { startLogout } from "../../actions/auth";
import { JournalEntries } from "./JournalEntries";
import { startNewNote } from "../../actions/notes";
// Inicio
export const Sidebar = () => {
  // hooks
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  // funciones
  const handleLogout = () => {
    dispatch(startLogout());
  };
  const handleAddNew = () => {
    dispatch(startNewNote());
  };
  // render
  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> {name}</span>
        </h3>
        <button className="btn mt-5" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="journal__new-entry" onClick={handleAddNew}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New Entry</p>
      </div>
      <JournalEntries />
    </aside>
  );
};

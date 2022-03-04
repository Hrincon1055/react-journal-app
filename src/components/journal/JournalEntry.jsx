import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
// Mis componentes
import { activeNote } from "../../actions/notes";
// Inicio
export const JournalEntry = ({ id, date, title, body, url }) => {
  // hooks
  const dispatch = useDispatch();
  // constantes
  const noteDate = moment(date);
  // funciones
  const handleEntryClick = () => {
    dispatch(activeNote(id, { date, title, body, url }));
  };
  // render

  return (
    <div
      className="jornal__entry animate__animated animate__fadeIn animate__faster"
      onClick={handleEntryClick}
    >
      {url && (
        <div
          className="jornal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}
      <div className="jornal__entry-body">
        <p className="jornal__entry-title">{title}</p>
        <p className="jornal__entry-content">{body}</p>
      </div>
      <div className="jornal__entry-date-box">
        <span>{noteDate.format("dddd")}</span>
        <h4>{noteDate.format("Do")}</h4>
      </div>
    </div>
  );
};

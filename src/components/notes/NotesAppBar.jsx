import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Miscomponentes
import { startSaveNote, startUploding } from "../../actions/notes";
// Inicio
export const NotesAppBar = () => {
  // hooks
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);
  // funciones
  const handleSave = () => {
    dispatch(startSaveNote(active));
  };
  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };
  const handelFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploding(file));
    }
  };
  // render
  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>
      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handelFileChange}
      />
      <div>
        <button className="btn" onClick={handlePictureClick}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

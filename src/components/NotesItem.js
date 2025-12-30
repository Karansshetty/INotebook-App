import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function NotesItem(props) {
  const { note, updateNote } = props;
  const context=useContext(NoteContext);
  const {deleteNote}=context;
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between gap-2">
            <h5 className="card-title mb-0">{note.title}</h5>
            <div className="d-flex align-items-center gap-2">
              <i className="fa-regular fa-pen-to-square note-action" role="button" aria-label="Edit note" onClick={updateNote}></i>
              <i className="fa-solid fa-trash note-action" role="button" aria-label="Delete note" onClick={()=>deleteNote(note._id)}></i>
            </div>
          </div>
          <p className="card-text">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotesItem;

import React,{useContext, useState} from "react";
import NoteContext from "../context/notes/NoteContext";

function AddNote() {
    const context=useContext(NoteContext);
    const {addNote}=context
    const [note,setNote]=useState({title:"",description:"",tag:""});

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
;    }
  return (
    <div className="card mb-4">
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h1 className="h4 mb-0">Add a note</h1>
          <span className="text-body-secondary small">Keep your notes organized and searchable</span>
        </div>

        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              name="title"
              onChange={onChange}
              required minLength={5}
              value={note.title}
              placeholder="e.g. Grocery list"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              required minLength={5}
              value={note.description}
              placeholder="Write something…"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag (optional)
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
              placeholder="e.g. personal, work"
            />
          </div>
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote

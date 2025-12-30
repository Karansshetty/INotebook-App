import React,{useContext, useState, useEffect, useRef} from "react";
import NoteContext from "../context/notes/NoteContext";
import NotesItem from "./NotesItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Notes() {
  const navigate=useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

   const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});
  
   useEffect(() => {
     if(!localStorage.getItem('token')){
       navigate("/login");
      }
      else{
    getNotes();
    navigate("/");
  }
// eslint-disable-next-line
}, []);

  const ref=useRef(null);

   const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }

    const handleClick=(e)=>{
     editNote(note.id,note.etitle,note.edescription,note.etag);
      
    
;    }

  const updateNote=(currentNote)=>{
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }

  return (
    <div>
    <AddNote/>
<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
         aria-describedby="emailHelp"
            name="etitle"
            value={note.etitle}
            onChange={onChange}
            placeholder="Short title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value={note.edescription}
            onChange={onChange}
            placeholder="Update your note..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            value={note.etag}
            onChange={onChange}
            placeholder="Optional"
          />
        </div>
      </form>
      </div>
      <div className="modal-footer d-grid gap-2 d-sm-flex justify-content-sm-end">
        <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
        <button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" data-bs-dismiss='modal' onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
      <h2 className="h4 mb-0">Your notes</h2>
      <span className="text-body-secondary small">Click the edit icon to update</span>
    </div>
    <div className="row g-3">
      {notes.length===0 && (
        <div className="col-12">
          <div className="alert alert-info mb-0" role="alert">
            No notes yet. Create your first note using the form above.
          </div>
        </div>
      )}
      {notes.map((note) => {
        return <NotesItem key={note._id} note={note} updateNote={() => updateNote(note)}/>
      })}
    </div>
    </div>
  );
}

export default Notes;

import NoteContext from "./NoteContext";
import React, { useState } from "react";

const NoteState = (props) => {

 
 const [alert, setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 3000)
  }
  
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // Get All Notes
  const getNotes = async () => {
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });

  const json = await response.json();

  // ✅ IMPORTANT SAFETY CHECK
  if (Array.isArray(json)) {
    setNotes(json);
  } else {
    console.error("fetchallnotes did not return array:", json);
    setNotes([]); // prevent crash
  }
};


  // Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
    showAlert("Note Added Successfully","success");
  };

  // Delete Note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    showAlert("Note Deleted Successfully","success");
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    showAlert("Note Updated Successfully","success"); 
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes,alert,showAlert }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;

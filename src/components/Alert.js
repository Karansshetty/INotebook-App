import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";


function Alert(props) {
  const context=useContext(NoteContext);
  const {alert}=context;
  return (
    <div style={{ height: "40px" }}>  {/* Reserve space so layout doesn't jump */}
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
         {alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;

import React from 'react'


function About() {
  return (
    <div className="inb-page">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          <div className="card">
            <div className="card-body p-4">
              <h1 className="h3 mb-3">About iNotebook</h1>

              <p className="mb-2">
                iNotebook is a simple and secure online note-taking app where you can create, edit, and organize your notes in one place.
                All your notes are stored safely with user authentication, ensuring only you can access them.
              </p>

              <p className="mb-0">
                Built using the MERN stack, iNotebook helps you keep your ideas organized, accessible, and safe anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

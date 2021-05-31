import Webcam from "react-webcam";
import React from 'react';

function Camera() {
  return (
    <div>
    <nav>
    <div className="nav nav-tabs" id="nav-tab" role="tablist">
      <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-camera" type="button" role="tab" aria-controls="nav-camera" aria-selected="true">Camera</button>
    </div>
    </nav>
    <div className="tab-content" id="nav-tabContent">
      <div className="tab-pane fade show active" id="nav-camera" role="tabpanel">
        {/* Disini Codingan Camera  */}
        <Webcam
          muted={true} 
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: "100%",
            height: "inherit",
          }}
        />
      </div>
    </div>
  </div>
  );
}

export default Camera;

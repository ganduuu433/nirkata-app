import Webcam from "react-webcam";
import React, {useState, useEffect} from 'react';
import {predict, initModel} from '../MLEngine/inference.js'

function Camera() {
  const [pred, setPred] = useState("");

  const showPrediction = async (webcam, mobilenet, model) => {
    let pred = await predict(webcam, mobilenet, model);
    setPred(pred);
  };

  const initInference = async () => {
    const {webcam, mobilenet, model} = initModel();
    await webcam.setup();
    // setInterval(
    //   () => showPrediction(),
    //   200
    // );
    showPrediction(webcam, mobilenet, model);
  };

  useEffect(
    () => {
      initInference();
    },
    []
  );

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
          id="webcam"
          audio={false}
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
            marginBottom: "-6px"
          }}
        />
        <div className="signDetection">
          <ul>
            <li id="sign"><h5>sign</h5></li>
            <li id="signResult"><h5><strong>{pred}</strong></h5></li>
            <li>   
            </li>
            <button type="button" className="signButton">
                <img src="img/pencil-icon.png"></img>
              </button>
          </ul>  
        </div>
      </div>
    </div>
  </div>
  );
}

export default Camera;

import Webcam from "react-webcam";
import React, {useState, useEffect, Component} from 'react';
import WebcamTF from '../MLEngine/webcam.js';
import * as tf from '@tensorflow/tfjs'


let webcam;
let model;
const modelURL = './mobilenet-ay-proc4-25/model.json'

const predictionMap = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'O',
    6: 'U',
    7: 'V',
    8: 'W'
};

// predict function for react app
async function predict() {
    const predictedClass = tf.tidy(() => {
        const img = webcam.capture();
        const predictions = model.predict(img)
        return predictions.as1D().argMax();
    });
    let preds = await predictedClass.data();
    const classId = preds[0];
        
    predictedClass.dispose();
    await tf.nextFrame();

    return predictionMap[classId]
}

function Camera(props) {
  const [pred, setPred] = useState("");
  const [state, setState] = useState("")

  const showPrediction = async () => {
    let pred = await predict();
    setPred(pred);
  };

  const initInference = async () => {
    model = await tf.loadLayersModel(modelURL);
    webcam = new WebcamTF(document.getElementById('webcam'));
    await webcam.setup();
    setInterval(
      () => showPrediction(),
      200
    );
  };

  var isKeyPressed = {
    'a': false, // ASCII code for 'a'
 // ... Other keys to check for custom key combinations
};

  document.onkeydown = (keyDownEvent) => {
  
    keyDownEvent.preventDefault();
    isKeyPressed[keyDownEvent.key] = true;
     
   if (isKeyPressed["c"]){
      props.parentCallback(pred)

   }
    document.onkeyup = (keyUpEvent) => {
  
    keyUpEvent.preventDefault();
     
    isKeyPressed[keyDownEvent.key] = false;
   };

   };

   
   

  useEffect(
    () => {initInference();},
    []
  );

  // console.log(props.parentCallback)

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
          screenshotFormat="image/jpeg"
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
            <button type="button" className="signButton" onClick={() => props.parentCallback(pred) } > 
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

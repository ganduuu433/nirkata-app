import Webcam from "react-webcam";
import React, {useState, useEffect} from 'react';
import WebcamTF from '../MLEngine/webcam.js';
import * as tf from '@tensorflow/tfjs'


let webcam;
let mobilenet;
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

async function loadMobilenet() {
    const mobilenet = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json');
    const layer = mobilenet.getLayer('conv_pw_13_relu');
    return tf.model({inputs: mobilenet.inputs, outputs: layer.output});
}

// predict function for react app
async function predict() {
    const predictedClass = tf.tidy(() => {
        const img = webcam.capture();
        // const activation = mobilenet.predict(img);
        // const predictions = model.predict(activation);
        const predictions = model.predict(img)
        return predictions.as1D().argMax();
    });
    let preds = await predictedClass.data();
    const classId = preds[0];
        
    predictedClass.dispose();
    await tf.nextFrame();

    return predictionMap[classId]
}

const initModel = async () => {
  const fps = 5;
  const fpsInterval = 1000 / fps; 
  
  // mobilenet = await loadMobilenet();
  model = await tf.loadLayersModel(modelURL);
}

function Camera() {
  const [pred, setPred] = useState("");

  const showPrediction = async () => {
    let pred = await predict();
    setPred(pred);
  };

  const initInference = async () => {
    await initModel();
    webcam = new WebcamTF(document.getElementById('webcam'));
    await webcam.setup();
    setInterval(
      () => showPrediction(),
      200
    );
  };

  useEffect(
    () => {initInference();},
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

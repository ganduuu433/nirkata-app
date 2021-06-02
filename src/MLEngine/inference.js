import * as tf from '@tensorflow/tfjs'

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
}

async function loadMobilenet() {
    const mobilenet = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json');
    const layer = mobilenet.getLayer('conv_pw_13_relu');
    return tf.model({inputs: mobilenet.inputs, outputs: layer.output});
}

// predict function for react app
async function predict(webcam, mobilenet, model) {
    const predictedClass = tf.tidy(() => {
        const img = webcam.capture();
        const activation = mobilenet.predict(img);
        const predictions = model.predict(activation);
        return predictions.as1D().argMax();
    });
    let preds = await predictedClass.data();
    const classId = preds[0];
        
    predictedClass.dispose();
    await tf.nextFrame();

    return predictionMap[classId]
}

async function initModel() {
    const fps = 5;
    const fpsInterval = 1000 / fps; 
    
    const mobilenet = await loadMobilenet();
    const modelURL = './mobilenet-ae-20/my_model.json'
    const model = await tf.loadLayersModel(modelURL);

    return {mobilenet, model}
}

export {predict, initModel};
import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber' 
import { OrbitControls } from '@react-three/drei' 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SignLanguage from './SignLanguage'
import './style.css';

function App() {
  const [action, setAction] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();


  if (!browserSupportsSpeechRecognition) {
    alert(`sorry your browser is out of date XD`)
  }

  if (!isMicrophoneAvailable) {
    alert(`sorry you can't use that`)
  }

  function startSpeech() {
    SpeechRecognition.startListening({ language: 'bg', continuous: true })
  }

  return (
    <>
      <div>
        <div>Microphone: {listening ? 'on' : 'off'}</div>
        <button onClick={startSpeech}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p className='try'>{transcript}</p>
      </div>  
      <div className='hero'>
        <Canvas>
          <ambientLight/>
          <pointLight intensity={2} position={[-1,1,3]} color='red'/>
          <pointLight intensity={2} position={[1,1,3]} color='blue'/>
          <pointLight intensity={2} position={[0,3,-10]} color='white'/>
          <Suspense fallback={null}>
            <SignLanguage action={action} transcript={transcript} setAction={setAction} listening={listening}/>
          </Suspense>
          <OrbitControls/>
        </Canvas>
      </div>
    </>
  );
}

export default App;

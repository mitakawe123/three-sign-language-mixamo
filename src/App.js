import React, { Suspense,useState,useContext } from 'react'
import {Canvas} from '@react-three/fiber' 
import {OrbitControls} from '@react-three/drei' 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SignLanguage from './SignLanguage'
import './style.css'
import {Context} from './Context'

function App({name}) {
  const [input,setInput] = useState('')
  const [action,setAction] = useState('')

  const [message, setMessage] = useState('стоя')

  const commands = [
    // {
    //   command: 'а',
    //   callback: () => setAction('А')
    // },
    {
      command: 'б',
      callback: () => setAction('Б')
    },
    {
      command: 'в',
      callback: () => setMessage(() => {
        setAction('В')
      })
    },
    {
      command: 'г',
      callback: () => setMessage(() => {
        setAction('Г')
      })
    },
    {
      command: 'д',
      callback: () => setAction('Д')
    },
    {
      command: 'е',
      callback: () => setMessage(() => {
        setAction('Е')
      })
    },
    {
      command: 'ж',
      callback: () => setMessage(() => {
        setAction('Ж')
      })
    },
    {
      command: 'з',
      callback: () => setMessage(() => {
        setAction('З')
      })
    },
    {
      command: 'и',
      callback: () => setMessage(() => {
        setAction('И')
      })
    },
    {
      command: 'й',
      callback: () => setMessage(() => {
        setAction('Й')
      })
    },
    {
      command: 'к',
      callback: () => setMessage(() => {
        setAction('К')
      })
    },
    {
      command: 'л',
      callback: () => setMessage(() => {
        setAction('Л')
      })
    },
    {
      command: 'м',
      callback: () => setMessage(() => {
        setAction('М')
      })
    },
    {
      command: 'н',
      callback: () => setMessage(() => {
        setAction('Н')
      })
    },
    {
      command: 'о',
      callback: () => setMessage(() => {
        setAction('О')
      })
    },
    {
      command: 'п',
      callback: () => setMessage(() => {
        setAction('П')
      })
    },
    {
      command: 'р',
      callback: () => setMessage(() => {
        setAction('Р')
      })
    },
    {
      command: 'с',
      callback: () => setMessage(() => {
        setAction('С')
      })
    },
    {
      command: 'т',
      callback: () => setMessage(() => {
        setAction('Т')
      })
    },
    {
      command: 'у',
      callback: () => setMessage(() => {
        setAction('У')
      })
    },
    {
      command: 'ф',
      callback: () => setMessage(() => {
        setAction('Ф')
      })
    },
    {
      command: 'х',
      callback: () => setMessage(() => {
        setAction('Х')
      })
    },
    {
      command: 'ц',
      callback: () => setMessage(() => {
        setAction('Ц')
      })
    },
    {
      command: 'ч',
      callback: () => setMessage(() => {
        setAction('Ч')
      })
    },
    {
      command: 'ш',
      callback: () => setMessage(() => {
        setAction('Ш')
      })
    },
    {
      command: 'щ',
      callback: () => setMessage(() => {
        setAction('Щ')
      })
    },
    {
      command: 'ъ',
      callback: () => setMessage(() => {
        setAction('Ъ')
      })
    },
    {
      command: 'ь',
      callback: () => setMessage(() => {
        setAction('Ь')
      })
    },
    {
      command: 'ю',
      callback: () => setMessage(() => {
        setAction('Ю')
      })
    },
    {
      command: 'я',
      callback: () => setMessage(() => {
        setAction('Я')
      })
    },
  ]

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition({ commands });


  if (!browserSupportsSpeechRecognition) {
    alert(`sorry your browser is out of date XD`)
  }

  if (!isMicrophoneAvailable) {
    alert(`sorry you can't use that`)
  }

  function startSpeech() {
    SpeechRecognition.startListening({language: 'bg',continuous: true })
  }

  const showAnimationInput = () => {
    if(input === 'б') {
      setAction('Б')
    }
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

    <div className="controls">
      {/* <button onClick={() => {setAction('RunForward')}}>Run Forward</button>
      <button onClick={() => {setAction('Death')}}>Death</button>
      <button onClick={() => {setAction('DrawArrow')}}>Draw Arrow</button>
      <button onClick={() => {setAction('StandingIdle')}}>Idle</button> */}
      <input name={name} type="text" placeholder='typa a' value={input} onChange={e => setInput(e.target.value)}/>
      <button onClick={showAnimationInput}>Show Animation When Typing</button>
    </div>
  <div className='hero'>
    <Canvas>
        <ambientLight/>
        <pointLight intensity={2} position={[-1,1,3]} color='red'/>
        <pointLight intensity={2} position={[1,1,3]} color='blue'/>
        <pointLight intensity={2} position={[0,3,-10]} color='white'/>
        <Suspense fallback={null}>
          <SignLanguage action={action} transcript={transcript} setAction={setAction}/>
        </Suspense>
        <OrbitControls/>
    </Canvas>
    </div>
  </>
  );
}

export default App;

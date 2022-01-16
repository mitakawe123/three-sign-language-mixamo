import React, { useRef,useEffect,useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { LoopOnce } from 'three';
import { Context } from './Context';

export default function Model({ ...props }) {
  
  const {transcript,setAction,action} = props
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/signLanguage.glb')
  const { actions } = useAnimations(animations, group)
  let previousAction = usePrevious(action)
  let array = transcript.split(" ")
  array = array.map(x => {return x.toUpperCase()})
  let activeAction
  let prevAction

  useEffect(() => {

    //trqbva da se napravi sas setAction trqbva da sravnq s loop kogato choveka kaje neshto da promenq setAction directno za da promenq samiq action 

    const mainActions = Object.keys(actions)
      for (let i = 0; i < array.length; i++) {
        if(array[i].length > 1) {
        
        let word = array[i].split('')
          for (let t = 0; t < word.length; t++) {

              if(previousAction) {
                // actions[previousAction]
                  // .fadeOut(1)
                  // .stop()
                  actions[previousAction].fadeOut(1)
              }
              // actions[word[t]]
              // .play()
              // .setLoop(LoopOnce)      
            actions[word[t]]
              .setEffectiveTimeScale( 1 )
              .setEffectiveWeight( 1 )
              .fadeIn( 1 )
              .setLoop(LoopOnce)
              .play();
            
        }
      } 
      else if(array[i].length == 1){
        if(previousAction) {
          actions[previousAction]
            .fadeOut(1)
            .stop()
        }
        actions[action]
          .play()
          .setLoop(LoopOnce)
          .fadeIn(1)
          .clampWhenFinished = true
      }
    }

},[action,actions])

  return (
    <Context.Provider value={actions}>
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Ctrl_Hand_IK_Left} />
      <primitive object={nodes.Ctrl_ArmPole_IK_Right} />
      <primitive object={nodes.Ctrl_Hand_IK_Right} />
      <primitive object={nodes.mixamorigHips} />
      <primitive object={nodes.Ctrl_Master} />
      <primitive object={nodes.Ctrl_ArmPole_IK_Left} />
      <primitive object={nodes.Ctrl_Foot_IK_Left} />
      <primitive object={nodes.Ctrl_LegPole_IK_Left} />
      <primitive object={nodes.Ctrl_Foot_IK_Right} />
      <primitive object={nodes.Ctrl_LegPole_IK_Right} />
      <skinnedMesh geometry={nodes.Ch03.geometry} material={materials.Ch03_Body} skeleton={nodes.Ch03.skeleton} />
    </group>
    </Context.Provider>
  )
}

useGLTF.preload('/signLanguage.glb')

function usePrevious(value) {
  const ref = useRef();
  // let [val,setVal] = useState() 
  useEffect(() => {
    ref.current = value;
    // setVal(value)
  }, [value]); 
  return ref.current;
}
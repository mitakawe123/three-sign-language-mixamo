import React, { useRef,useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { LoopOnce } from 'three';
import { Context } from './Context';

export default function Model({ ...props }) {
  
  const {action} = props
  const {transcript} = props
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/signLanguage.glb')
  const { actions } = useAnimations(animations, group)
  const previousAction = usePrevious(action)
  let array = transcript.split(" ")
  array = array.map(x => {return x.toUpperCase()})
  useEffect(() => {

    const mainActions = Object.keys(actions)
      for (let i = 0; i < array.length; i++) {

      if(array[i].length > 1) {
        let word = array[i].split('')
        console.log(array);
          for (let t = 0; t < word.length; t++) {
              if(previousAction) {
                actions[previousAction]
                  .fadeOut(1)
                  .stop()
              }
              actions[word[t]]
              .play()
              .setLoop(LoopOnce)              
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
  useEffect(() => {
    ref.current = value;
  }, [value]); 
  return ref.current;
}
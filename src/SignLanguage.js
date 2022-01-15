import React, { useRef,useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { LoopOnce } from 'three';

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
    // console.log(array);
    const mainActions = Object.keys(actions)
    
    for (let i = 0; i < array.length; i++) {
      if(mainActions.includes(array[i])) {
          if(previousAction) {
            actions[previousAction].fadeOut(1).stop()
          }
          actions[array[i]].play().setLoop(LoopOnce).fadeIn(1).clampWhenFinished = true
      } else {
          for (let t = 0; t < array[i].length; t++) {
              if(previousAction) {
                actions[previousAction].fadeOut(1).stop()
              }
              actions[array[i]].play().setLoop(LoopOnce).fadeIn(1).clampWhenFinished = true
          }
      }
}
},[action,actions])

  return (
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
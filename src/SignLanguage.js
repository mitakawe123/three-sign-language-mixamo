import React, { useRef, useEffect, useContext } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { LoopOnce } from "three";
import { Context } from "./Context";

export default function Model({ ...props }) {
  
  const { transcript, action, listening } = props;
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/signLanguage.glb");
  const { actions } = useAnimations(animations, group);
  let previousAction = usePrevious(action);

  let array = transcript.split(" ").map(x => x.toUpperCase());
  const objKeys = Object.keys(actions);
  let activeAction = actions['стоя'];

  if (!listening) {
    for (let i = 0; i < array.length; i++) {
      if (objKeys.includes(array[i])) {
        
        previousAction = activeAction;
        activeAction = actions[array[i]];

        if (previousAction !== activeAction) {
          previousAction.fadeOut(2);
        }

        activeAction
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(2)
        .play()
        .setLoop(LoopOnce)
        .clampWhenFinished = true;
      } else {
        for (let j = 0; j < array[i].length; j++) {
          previousAction = activeAction;
          activeAction = actions[array[i][j]];

          if (previousAction !== activeAction) {
            previousAction.fadeOut(2);
          }

          activeAction
          .reset()
          .setEffectiveTimeScale(1)
          .setEffectiveWeight(1)
          .fadeIn(2)
          .play()
          .setLoop(LoopOnce)
          .clampWhenFinished = true;
        }
      }
    }
  }

  return (
    <Context.Provider value={array}>
      <group ref={group} {...props} dispose={null}>
        <primitive object={ nodes.Ctrl_Hand_IK_Left } />
        <primitive object={ nodes.Ctrl_ArmPole_IK_Right } />
        <primitive object={ nodes.Ctrl_Hand_IK_Right } />
        <primitive object={ nodes.mixamorigHips } />
        <primitive object={ nodes.Ctrl_Master } />
        <primitive object={ nodes.Ctrl_ArmPole_IK_Left } />
        <primitive object={ nodes.Ctrl_Foot_IK_Left } />
        <primitive object={ nodes.Ctrl_LegPole_IK_Left } />
        <primitive object={ nodes.Ctrl_Foot_IK_Right } />
        <primitive object={ nodes.Ctrl_LegPole_IK_Right } />
        <skinnedMesh geometry={ nodes.Ch03.geometry } material={ materials.Ch03_Body } skeleton={ nodes.Ch03.skeleton } />
      </group>
    </Context.Provider>
  );
}

useGLTF.preload("/signLanguage.glb");

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]); 
  return ref.current;
}
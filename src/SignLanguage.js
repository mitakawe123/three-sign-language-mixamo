import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { LoopOnce } from "three";

export default function Model({ ...props }) {
  
  const { transcript, action, listening } = props;
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/signLanguage.glb");
  const { actions } = useAnimations(animations, group);

  let array = transcript.split(" ").map(x => x.toUpperCase());
  const objKeys = Object.keys(actions).map(x => x.toUpperCase());

  let queue = [];
  let previousAction = "";

  if (!listening) {
    for (let i = 0; i < array.length; i++) {
      if (objKeys.includes(array[i])) {
        queue.push(array[i].toLowerCase());
      } else {
        for (let j = 0;j < array[i].length; j++) {
          queue.push(array[i][j].toLowerCase());
        }
      }
    }

    for (let i = 0; i < queue.length; i++) {
      if (queue.length === 0) {
        previousAction = queue[0];
      } else {
        previousAction = queue[i - 1];
      }
      
      if(previousAction) {
        actions[previousAction.toUpperCase()]
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .setDuration(1)
        .fadeOut(3);
      }

      actions[queue[i].toUpperCase()]
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(3)
      .setLoop(LoopOnce)
      .play()
      .clampWhenFinished = true;
    }
  }

  return (
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
  );
}

useGLTF.preload("/signLanguage.glb");
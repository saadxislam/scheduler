import { useState } from 'react';

export default function useVisualMode(initial) {
  const [state, setState] = useState([initial]);

  function transition(mode, replace) {

    const newState = [...state]

    if (replace) {
      newState.pop();
    } 
    newState.push(mode);
    setState(newState);

    // setState(prev => {
    //   const newState = [...prev]
    //   if (replace) {
    //     newState.pop();
    //   }
    //   newState.push(mode)
    //   return newState;
    // })
  }

  const back = function () {
    if (state.length < 2) { // state.length = 1
      return;
    }
    const newState = [...state]
    newState.pop();
    console.log('newState :', newState);
    setState(newState);
  }
  // console.log(state);
  const mode = state.slice(-1)[0] //state[state.length-1]
  // console.log('mode :', mode);
  return { mode, transition, back };
}







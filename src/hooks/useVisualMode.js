import { useState } from "react";

// Helper function passed to Index.js to update state for transitions
export default function useVisualMode(initial) {
  const [state, setState] = useState([initial]);

  function transition(mode, replace) {
    const newState = [...state];

    if (replace) {
      newState.pop();
    }
    newState.push(mode);
    setState(newState);
  }

  const back = function () {
    if (state.length < 2) {
      // state.length = 1
      return;
    }
    const newState = [...state];
    newState.pop();
    setState(newState);
  };
  const mode = state.slice(-1)[0];
  return { mode, transition, back };
}

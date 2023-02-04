import { useState, useEffect, useRef } from "react";

/**
 * Shared hook implemented by pub-sub.
 * @param name id of the subscription
 * @param initial initial state
 * @return initial state
 */
export default (name, initial) => {
  const [state, setState] = useState(initial);

  useEffect(() => {
    subscribe(name, (nextState) => {
      setState(nextState)
    })
    return unsubscribe(name)
  })
  return state
}

const queue = {};
export const broadcast = (name, nextState) => {
  if (!queue[name]) return;
  queue[name](nextState);
};
export const subscribe = (name, cb) => {
  queue[name] = cb;
};
export const unsubscribe = (name) => {
  return name => {
    if (!queue[name]) return;
    queue[name] = null;
  }
};

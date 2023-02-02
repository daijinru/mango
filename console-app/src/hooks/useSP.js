import { useState, useEffect, useRef } from "react";

const states = {};
/**
 * The state can be shared with diff components,
 * and it's listener need to useEffect.
 */
export default (name, value) => {
  const [state, setState] = useState(value);
  subscribe(name, (nextVal) => {
    setState(nextVal);
    states[name] = nextVal;
  })
  return [state, () => {
    return states[name];
  }, () => {
    unsubscribe(name)
  }];
}

export const getState = name => {
  if (!states[name]) return;
  return states[name];
}

const queue = {};
export const broadcast = (name, state) => {
  if (!queue[name]) return;
  queue[name](state);
};
export const subscribe = (name, cb) => {
  queue[name] = cb;
};
export const unsubscribe = (name) => {
  if (!queue[name]) return;
  queue[name] = null;
};

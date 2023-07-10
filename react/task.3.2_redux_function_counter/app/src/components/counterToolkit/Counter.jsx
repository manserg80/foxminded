import './counterStyle.css';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset } from '../../reduxToolkit/slice';
// import store from '../store';

function AppFunctionToolkit() {
  const dispatch = useDispatch()
  let count = useSelector(state => state.counter.count)
  
  return (
    <div className="App">
      <h1 className= {count > 0 ? "positive" : count < 0 ? "negative" : null}>{ count }</h1> 
      <div className="button-wrapper">
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>

      <div className="seperator"></div>

      <h2>Application State</h2>
      <p>Count: { count }</p>
      <div className="button-wrapper">
        <button className="text" onClick={() => dispatch(reset())}>Clear State</button>
      </div>
    </div>
  );
}
export default AppFunctionToolkit;

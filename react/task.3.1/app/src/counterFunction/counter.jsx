import './counterStyle.css';

import React from 'react';
const { useState } = React;

function AppFunction() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="App">
      <h1 className= {count > 0 ? "positive" : count < 0 ? "negative" : null}>{ count }</h1> 
      <div className="button-wrapper">
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>

      <div className="seperator"></div>

      <h2>Application State</h2>
      <p>Count: { count }</p>
      <div className="button-wrapper">
        <button className="text" onClick={() => setCount(0)}>Clear State</button>
      </div>
    </div>
  );
}
export default AppFunction;

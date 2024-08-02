

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from '../pages/Counterslice';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Moved useNavigate here

  const [incrementAmount, setIncrementAmount] = useState('2');

  const RouteToLanding = () => { // Renamed function to follow camelCase convention
    navigate('/landing');
    console.log("hello routing"); // Corrected typo here
  };

  return (
    <div>
      <div >
        <button
          
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span >{count}</span>
        <button
         
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div >
        <input
          
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
         
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
        <button onClick={RouteToLanding}>
          Go to Landing Page
        </button>
      </div>
    </div>
  );
}

export default Counter;


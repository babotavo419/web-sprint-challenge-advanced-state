import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

export default function Wheel() {
  const dispatch = useDispatch();
  const wheelState = useSelector(state => state.wheel);

  const handleMoveClockwise = () => {
    dispatch(moveClockwise());
  };

  const handleMoveCounterClockwise = () => {
    dispatch(moveCounterClockwise());
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        {[0, 1, 2, 3, 4, 5].map(index => (
          <div
            key={index}
            className={`cog ${index === wheelState ? 'active' : ''}`}
            style={{ "--i": index }}
          >
            {index === wheelState ? 'B' : ''}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleMoveCounterClockwise}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleMoveClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}




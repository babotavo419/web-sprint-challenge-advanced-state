import React from 'react';
import { useDispatch } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

export default function Wheel() {
  const dispatch = useDispatch();

  const handleMoveClockwise = () => {
    dispatch(moveClockwise());
  };

  const handleMoveCounterClockwise = () => {
    dispatch(moveCounterClockwise());
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        <div className="cog active" style={{ "--i": 0 }}>
          B
        </div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>
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


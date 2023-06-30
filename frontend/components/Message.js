import React from 'react';
import { useSelector } from 'react-redux';

export default function Message(props) {
  // Get the message from the Redux store
  const message = useSelector(state => state.infoMessage);

  // Display the message
  return <div id="message">{message}</div>;
}



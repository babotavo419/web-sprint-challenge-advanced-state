import React from 'react';
import { useSelector } from 'react-redux';

export default function Message() {
  const infoMessage = useSelector(state => state.infoMessage);
  const formMessage = useSelector(state => state.form.infoMessage);

  let messageToShow = '';

  if (infoMessage === 'correct') {
    messageToShow = 'Nice job! That was the correct answer.';
  } else if (infoMessage === 'incorrect') {
    messageToShow = 'What a shame! That was the incorrect answer.';
  } else if (formMessage) {
    messageToShow = `Congrats: "${formMessage}" is a great question!`;
  }

  return <div id="message">{messageToShow}</div>;
}


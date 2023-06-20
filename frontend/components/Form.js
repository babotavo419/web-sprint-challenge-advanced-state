import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postQuiz, inputChange, resetForm } from '../state/action-creators';

export function Form() {
  const [errorMessage, setErrorMessage] = useState('');
  const form = useSelector(state => state.form);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { id, value } = event.target;
    dispatch(inputChange(id, value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all form inputs have non-empty values
    const { newQuestion, newTrueAnswer, newFalseAnswer } = form;
    if (!newQuestion.trim() || !newTrueAnswer.trim() || !newFalseAnswer.trim()) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Dispatch the postQuiz action to submit the new quiz
    dispatch(postQuiz(newQuestion, newTrueAnswer, newFalseAnswer));

    // Reset the form after submission
    dispatch(resetForm());
    setErrorMessage('');
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={handleChange}
        id="newQuestion"
        placeholder="Enter question"
        value={form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={handleChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={handleChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={form.newFalseAnswer}
      />
      <button id="submitNewQuizBtn">Submit new quiz</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default Form;

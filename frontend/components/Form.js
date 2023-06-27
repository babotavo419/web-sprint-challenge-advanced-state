import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postQuiz } from '../state/action-creators';

export default function Form() {
  const dispatch = useDispatch();
  const formState = useSelector(state => state.form);

  const { newQuestion, newTrueAnswer, newFalseAnswer } = formState; // Access form fields from the Redux store

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'newQuestion':
        setNewQuestion(value);
        break;
      case 'newTrueAnswer':
        setNewTrueAnswer(value);
        break;
      case 'newFalseAnswer':
        setNewFalseAnswer(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postQuiz(newQuestion, newTrueAnswer, newFalseAnswer));
  };

  const isButtonDisabled = newQuestion.trim().length <= 1 || newTrueAnswer.trim().length <= 1 || newFalseAnswer.trim().length <= 1;

  const setNewQuestion = (value) => {
    dispatch({
      type: 'INPUT_CHANGE',
      fieldName: 'newQuestion',
      value: value,
    });
  };

  const setNewTrueAnswer = (value) => {
    dispatch({
      type: 'INPUT_CHANGE',
      fieldName: 'newTrueAnswer',
      value: value,
    });
  };

  const setNewFalseAnswer = (value) => {
    dispatch({
      type: 'INPUT_CHANGE',
      fieldName: 'newFalseAnswer',
      value: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Quiz</h2>

      <div>
        <label htmlFor="newQuestion">Question: </label>
        <input
          type="text"
          id="newQuestion"
          name="newQuestion"
          value={newQuestion}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="newTrueAnswer">True Answer: </label>
        <input
          type="text"
          id="newTrueAnswer"
          name="newTrueAnswer"
          value={newTrueAnswer}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="newFalseAnswer">False Answer: </label>
        <input
          type="text"
          id="newFalseAnswer"
          name="newFalseAnswer"
          value={newFalseAnswer}
          onChange={handleInputChange}
        />
      </div>

      <button
        type="submit"
        disabled={isButtonDisabled}
        id="submitButton"
        data-testid="submitButton"
      >
        Submit
      </button>
    </form>
  );
}


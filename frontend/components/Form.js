import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postQuiz } from '../state/action-creators';

export default function Form() {
  const dispatch = useDispatch();
  const infoMessage = useSelector(state => state.infoMessage);

  const [newQuestion, setNewQuestion] = useState("");
  const [newTrueAnswer, setNewTrueAnswer] = useState("");
  const [newFalseAnswer, setNewFalseAnswer] = useState("");

  const isButtonDisabled = newQuestion.trim().length < 2 || newTrueAnswer.trim().length < 2 || newFalseAnswer.trim().length < 2;

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
    setNewQuestion("");
    setNewTrueAnswer("");
    setNewFalseAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} data-testid="myForm">
      <h2>Create New Quiz</h2>
      {
        infoMessage &&
          <div className="info-message">
            {infoMessage}
          </div>
      }

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




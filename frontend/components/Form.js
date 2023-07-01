import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postQuiz, inputChange } from '../state/action-creators';

export default function Form() {
  const dispatch = useDispatch();
  const formState = useSelector(state => state.form);
  const infoMessage = useSelector(state => state.infoMessage);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(inputChange(name, value));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const { newQuestion, newTrueAnswer, newFalseAnswer } = formState;
    dispatch(postQuiz(newQuestion, newTrueAnswer, newFalseAnswer));
  };
  
  const { newQuestion, newTrueAnswer, newFalseAnswer } = formState;
  
  const isButtonDisabled = (
    newQuestion.replace(/^\s+|\s+$/g, '').length <= 1 ||
    newTrueAnswer.replace(/^\s+|\s+$/g, '').length <= 1 ||
    newFalseAnswer.replace(/^\s+|\s+$/g, '').length <= 1
);

  
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




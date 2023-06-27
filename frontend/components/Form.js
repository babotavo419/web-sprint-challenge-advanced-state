import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postQuiz } from '../state/action-creators';

export default function Form() {
  const dispatch = useDispatch();
  const formState = useSelector(state => state.form); // Listen for the form state in Redux

  const [newQuestion, setNewQuestion] = useState('');
  const [newTrueAnswer, setNewTrueAnswer] = useState('');
  const [newFalseAnswer, setNewFalseAnswer] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Reset the form fields when the form state is reset in Redux
  useEffect(() => {
    if (formState.newQuestion === '' && formState.newTrueAnswer === '' && formState.newFalseAnswer === '') {
      setNewQuestion('');
      setNewTrueAnswer('');
      setNewFalseAnswer('');
    }
  }, [formState]);

  useEffect(() => {
    const checkIfInputsAreValid = () => {
      return (
        newQuestion.trim().length > 1 &&
        newTrueAnswer.trim().length > 1 &&
        newFalseAnswer.trim().length > 1
      );
    };
  
    setIsButtonDisabled(!checkIfInputsAreValid());
  }, [newQuestion, newTrueAnswer, newFalseAnswer]);

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


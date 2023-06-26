import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { postQuiz, setMessage, resetForm } from '../state/action-creators';

export default function Form() {
  const dispatch = useDispatch();

  const [newQuestion, setNewQuestion] = useState('');
  const [newTrueAnswer, setNewTrueAnswer] = useState('');
  const [newFalseAnswer, setNewFalseAnswer] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const checkIfInputsAreValid = () => {
      return (
        newQuestion && newQuestion.trim() &&
        newTrueAnswer && newTrueAnswer.trim() &&
        newFalseAnswer && newFalseAnswer.trim()
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
      <h2>Add a New Quiz</h2>
      
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
      
      <button type="submit" disabled={isButtonDisabled}>Submit</button>
    </form>
  );
}


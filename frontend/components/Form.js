import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postQuiz, setMessage, resetForm } from '../state/action-creators';

export default function Form() {
  const dispatch = useDispatch();
  const infoMessage = useSelector(state => state.infoMessage);

  const [newQuestion, setNewQuestion] = useState('');
  const [newTrueAnswer, setNewTrueAnswer] = useState('');
  const [newFalseAnswer, setNewFalseAnswer] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem('formData');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setNewQuestion(parsedState.newQuestion || '');
      setNewTrueAnswer(parsedState.newTrueAnswer || '');
      setNewFalseAnswer(parsedState.newFalseAnswer || '');
    }
  }, []);

  useEffect(() => {
    const checkIfInputsAreValid = () => {
      return (
        newQuestion.trim().length > 0 && // Check for more than 0 instead of more than 1
        newTrueAnswer.trim().length > 0 &&
        newFalseAnswer.trim().length > 0
      );
    };
  
    setIsButtonDisabled(!checkIfInputsAreValid());
  }, [newQuestion, newTrueAnswer, newFalseAnswer]);


  useEffect(() => {
    const stateToSave = { newQuestion, newTrueAnswer, newFalseAnswer };
    localStorage.setItem('formData', JSON.stringify(stateToSave));
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
          data-testid="submitButton" // Adding a data-testid attribute
            >
            Submit
        </button>
        </form>
    );

}


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postQuiz, inputChange, resetForm } from '../state/action-creators';

function Form() {
  const dispatch = useDispatch();
  
  // Select form state and message from Redux store
  const message = useSelector(state => state.infoMessage);
  const formState = useSelector(state => state.form);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(inputChange(name, value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch postQuiz action
    dispatch(postQuiz(formState.questionText, formState.trueAnswerText, formState.falseAnswerText));
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <input
        type="text"
        name="questionText"
        value={formState.questionText || ""}
        onChange={handleInputChange}
        placeholder="Question"
      />
      <input
        type="text"
        name="trueAnswerText"
        value={formState.trueAnswerText || ""}
        onChange={handleInputChange}
        placeholder="True Answer"
      />
      <input
        type="text"
        name="falseAnswerText"
        value={formState.falseAnswerText || ""}
        onChange={handleInputChange}
        placeholder="False Answer"
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;


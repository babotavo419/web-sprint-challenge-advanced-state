import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAnswer, postAnswer } from '../state/action-creators';

export default function Quiz() {
  const quiz = useSelector(state => state.quiz);
  const selectedAnswer = useSelector(state => state.selectedAnswer);
  const dispatch = useDispatch();

  const handleSelectAnswer = (answerId) => {
    dispatch(selectAnswer(answerId));
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      dispatch(postAnswer(quiz.id, selectedAnswer));
    }
  };

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question_text}</h2>

          <div id="quizAnswers">
            {quiz.answers.map(answer => (
              <div
                key={answer.id}
                className={`answer ${selectedAnswer === answer.id ? 'selected' : ''}`}
                onClick={() => handleSelectAnswer(answer.id)}
              >
                {answer.text}
                <button>{selectedAnswer === answer.id ? 'SELECTED' : 'Select'}</button>
              </div>
            ))}
          </div>

          <button id="submitAnswerBtn" disabled={!selectedAnswer} onClick={handleSubmitAnswer}>
            Submit answer
          </button>
        </>
      ) : (
        'Loading next quiz...'
      )}
    </div>
  );
}

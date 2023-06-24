import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuiz, selectAnswer, postAnswer } from '../state/action-creators';

export default function Quiz() {
  const quiz = useSelector(state => state.quiz);
  const selectedAnswer = useSelector(state => state.selectedAnswer);
  const message = useSelector(state => state.infoMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch quiz data from the API and transform it
    fetch('http://localhost:9000/api/quiz/next')
      .then(response => response.json())
      .then(data => {
        const transformedQuiz = {
          quiz_id: data.quiz_id,
          question: data.question,
          answers: data.answers.map(answer => ({
            answer_id: answer.answer_id,
            text: answer.text,
          })),
        };

        dispatch(setQuiz(transformedQuiz)); // Set the transformed quiz into state
      })
      .catch(error => {
        console.log('Error fetching quiz:', error);
        // Dispatch an action to handle error cases if needed
      });
  }, []);

  const handleSelectAnswer = (answerId) => {
    dispatch(selectAnswer(answerId));
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      dispatch(postAnswer(quiz.quiz_id, selectedAnswer));
    }
  };

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>

          <div id="quizAnswers">
            {quiz.answers.map((answer, index) => (
              <div
                key={answer.answer_id}
                className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`}
                onClick={() => handleSelectAnswer(answer.answer_id)}
              >
                {answer.text}
                <button>{selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}</button>
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

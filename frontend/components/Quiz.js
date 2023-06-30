import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer, infoMessage } from '../state/action-creators'; // Make sure this path is correct

export default function Quiz(props) {
  const dispatch = useDispatch();

  // Get necessary data from the Redux store
  const quiz = useSelector(state => state.quiz);
  const selectedAnswer = useSelector(state => state.selectedAnswer);
  const infoMessage = useSelector(state => state.infoMessage);

  useEffect(() => {
    // Fetch the quiz data when the component mounts
    dispatch(fetchQuiz());
  }, [dispatch]);

  const handleAnswerSelection = (answer) => {
    dispatch(selectAnswer(answer));
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      dispatch(postAnswer(quiz.quiz_id, selectedAnswer.answer_id));
    }
  };

  return (
    <div id="wrapper">
      {
        quiz ? (
          <>
            <h2>{quiz.question}</h2>
            <div id="quizAnswers">
              {quiz.answers.map(answer => (
                <div
                  className={`answer ${selectedAnswer === answer ? 'selected' : ''}`}
                  key={answer.answer_id}
                  onClick={() => handleAnswerSelection(answer)}
                >
                  {answer.text}
                  <button>
                    {selectedAnswer === answer ? 'SELECTED' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
              <button id="submitAnswerBtn"
              disabled={!selectedAnswer} 
              onClick={handleSubmitAnswer}>
              Submit answer
              </button>
            </>
        ) : 'Loading next quiz...'
      }
    </div>
  );
}

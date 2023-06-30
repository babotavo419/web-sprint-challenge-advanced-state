import {
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
} from './action-types';

export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE
  };
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE
  };
}

export function selectAnswer(answer) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: answer
  };
}

export function setMessage(message) {
  return {
    type: SET_INFO_MESSAGE,
    payload: message
  };
}

export function setQuiz(quiz) {
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quiz
  };
}

export function inputChange(name, value) {
  return {
    type: INPUT_CHANGE,
    payload: { name, value }
  };
}

export function resetForm() {
  return {
    type: RESET_FORM
  };
}

// Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    fetch('http://localhost:9000/api/quiz/next')
      .then(response => response.json())
      .then(data => {
        dispatch(setQuiz(data));
      })
      .catch(error => {
        console.error('Error fetching the quiz:', error);
        dispatch(setMessage('Error fetching the quiz'));
      });
  };
}

export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    const answerSubmission = { quiz_id, answer_id };

    fetch('http://localhost:9000/api/quiz/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answerSubmission),
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setMessage(data.message)); // Using the actual message from the server
        dispatch(fetchQuiz());
      })
      .catch(error => {
        console.error('Error posting the answer:', error);
        dispatch(setMessage('Error posting the answer'));
      });
  };
}

export function postQuiz(question_text, true_answer_text, false_answer_text) {
  return function (dispatch) {
    const newQuizQuestion = { question_text, true_answer_text, false_answer_text };

    fetch('http://localhost:9000/api/quiz/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuizQuestion),
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setMessage(data.message)); // Dispatch message when new quiz is posted
        dispatch(resetForm());
      })
      .catch(error => {
        console.error('Error posting the new quiz:', error);
        dispatch(setMessage('Error posting the new quiz'));
      });
  };
}